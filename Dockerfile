# Build React
FROM node:20 AS frontend

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend .
RUN npm run build


# FastAPI
FROM python:3.11

# Set up a non-root user (required by Hugging Face Spaces)
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

WORKDIR /app

# Copy backend files and change ownership to the new user
COPY --chown=user backend .

# Install Python requirements
RUN pip install --no-cache-dir -r requirements.txt

# Copy built frontend from the node stage to the static directory
COPY --chown=user --from=frontend /frontend/dist ./static

EXPOSE 7860

CMD ["uvicorn","main:app","--host","0.0.0.0","--port","7860"]
