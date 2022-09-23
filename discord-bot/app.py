# FOMO discord bot
import os
import discord
import requests
import json
from dotenv import load_dotenv
from discord.ext import commands

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

bot = commands.Bot(command_prefix='%', intents=discord.Intents.all())

# Logs in to api as a dev and returns the access token
def login():
    endpoint = os.getenv('FOMO_URL') + "/login"
    data = {
        "username": os.getenv('FOMO_USER'),
        "password": os.getenv('FOMO_PASS')
    }
    return requests.post(endpoint, json=data).json()

# Adds an event using fomo api
def addEvent(name, description, start_time, end_time, tags, societyId):
    # Login
    accessToken = login()
    data = {
        "societyId": societyId,
        "eventName": name,
        "start": start_time,
        "end": end_time,
        "tags": tags,
        "description": description,
    }
    headers = {
        'Authorization': 'Bearer ' + accessToken["accessToken"]
    }
    endpoint = os.getenv('FOMO_URL') + "/event/add"
    return requests.post(endpoint, json=data, headers=headers).json()


@bot.event
async def on_ready():
    print(f'{bot.user} has connected to Discord!')
    return

@bot.event
async def on_scheduled_event_create(event):
    # TODO Change the below print statements to discord messages

    endpoint = os.getenv('FOMO_URL') + "/society/getAll"
    societies = requests.get(endpoint).json()
    foundSociety = False
    for society in societies:
        if 'guildId' in society:
            if society["guildId"] == str(event.guild.id):
                foundSociety = True
                response = addEvent(event.name, event.description, int(event.start_time.timestamp())*1000, int(event.end_time.timestamp())*1000, [], society["_id"])
                if 'error' in response:
                    print("An error has occured sending an event: " + response["error"])
                else:
                    print("Added " + event.name + " to FOMO!")
    if foundSociety == False:
        print("This server has not been assigned a society. Please run the %setSociety command")
    return

# Allows the user to set what society their guild is a part of
@bot.command(name='setSociety')
async def setSociety(ctx, username, password, societyName):
    # Check if valid user
    endpoint = os.getenv('FOMO_URL') + "/login"
    data = {
        "username": username,
        "password": password
    }

    userAccessToken = requests.post(endpoint, json=data).json()
    if "accessToken" not in userAccessToken:
        await ctx.channel.send("Incorrect username/password")
        return

    # Login dev
    devAccessToken = login()
    # Add guild
    endpoint = os.getenv('FOMO_URL') + "/society/addGuild"
    data = {
        "societyName": societyName,
        "username": username,
        "guildId": str(ctx.guild.id)
    }
    headers = {
        'Authorization': 'Bearer ' + devAccessToken["accessToken"]
    }
    try:
        response = requests.post(endpoint, json=data, headers=headers).json()
        if ('error' in response):
            await ctx.channel.send("An error has occured: " + response["error"])
        else:
            await ctx.channel.send(ctx.guild.name + " has been successfully added to " + societyName)
    except:
        await ctx.channel.send("An error has occured")
    return

bot.run(TOKEN)