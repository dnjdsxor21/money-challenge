FROM python:3.8

WORKDIR /app

COPY requirements.txt .

# Install project dependencies using Poetry
RUN pip3 install -r requirements.txt

COPY . /app

# Expose any necessary ports for your application (if applicable)
EXPOSE 8000

# Command to run your application (replace 'main.py' with your actual entry point file)
CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=8000"]