from flask import Flask, jsonify
from telethon import TelegramClient

# Создаем Flask приложение
app = Flask(__name__)

# Установи эти параметры из Telegram API (https://my.telegram.org/)
api_id = '29796724'
api_hash = '40ae2dfe99826918351004e6ab0c7274'
channel_username = 'Meschc'  # Никнейм канала

# Инициализация клиента Telethon
client = TelegramClient('anon', api_id, api_hash)

@app.route('/subscriber_count', methods=['GET'])
async def get_subscriber_count():
    # Асинхронно получаем информацию о канале
    async with client:
        entity = await client.get_entity(channel_username)
        return jsonify({"subscribers": entity.participants_count})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
