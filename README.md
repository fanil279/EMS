.\venv\Scripts\Activate.ps1
daphne -p 8000 EMS.asgi:application
python manage.py runserver

http://127.0.0.1:8000/swagger/
http://127.0.0.1:8000/redoc/
