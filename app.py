
import os
from flask import Flask, jsonify
from telethon import TelegramClient

# Инициализация Flask приложения
app = Flask(__name__)

# Установи эти параметры из Telegram API (https://my.telegram.org/)
api_id = '29796724'
api_hash = '40ae2dfe99826918351004e6ab0c7274'
channel_username = 'Meschc'  # Никнейм канала

# Создаем экземпляр клиента Telethon для подключения к Telegram API
client = TelegramClient('anon', API_ID, API_HASH)

# Асинхронная функция для получения количества подписчиков
async def get_subscriber_count():
    await client.start()
    entity = await client.get_entity(CHANNEL_USERNAME)
    return entity.participants_count

# Роут для отображения количества подписчиков
@app.route('/')
async def index():
    count = await get_subscriber_count()
    return jsonify({"subscriber_count": count})

# Запуск приложения на указанном порту
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
