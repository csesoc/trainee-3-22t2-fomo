# FOMO discord bot
import os
import discord
import requests
import json
from dotenv import load_dotenv
from discord.ext import commands

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
client = discord.Client(intents=discord.Intents.default())

bot = commands.Bot(command_prefix='%')

# Logs in to api and returns the access token
def login():
    endpoint = os.getenv('FOMO_URL') + "/login"
    data = {
        "username": os.getenv('FOMO_USER'),
        "password": os.getenv('FOMO_PASS')
    }

    return requests.post(endpoint, json=data).json()

# Adds an event using fomo api
def addEvent(name, description, start_time, end_time, tags, societyName):
    # Login
    accessToken = login()["accessToken"]
    endpoint = os.getenv('FOMO_URL') + "/event/add"

    # TODO

    # Get societyId
    # data = {
    #     "societyId": "62ff46bb7fd160728335e271",
    #     "eventName": "Trainee-3 Only Event",
    #     "start": 323123213231,
    #     "end": 10000000000000,
    #     "description": "Super secret get together",
    #     "tags": []
    # }

@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')

@client.event
async def on_scheduled_event_create(event):
    print(event.start_time, event.end_time, event.name, event.description)
    print(event.guild.id)
    print(login())


# Allows the user to set what society their guild is a part of
@bot.command(name='setSociety')
async def setSociety(ctx, username, password, societyName):
    # Check if valid user
    endpoint = os.getenv('FOMO_URL') + "/login"
    data = {
        "username": username,
        "password": password
    }

    accessToken = requests.post(endpoint, json=data).json()
    if "accessToken" not in accessToken:
        print("login failed")
        return
    endpoint = os.getenv('FOMO_URL') + '/society/'

    print("TODO")



client.run(TOKEN)
