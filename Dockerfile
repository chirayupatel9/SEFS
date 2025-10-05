# syntax=docker/dockerfile:1

FROM python:3.9.2

WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# Copy application code
COPY . .

# Expose Flask port
EXPOSE 5000

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=development

# Run the Flask application
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]