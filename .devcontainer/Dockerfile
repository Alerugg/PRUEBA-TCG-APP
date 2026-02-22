FROM mcr.microsoft.com/devcontainers/python:0-3.10

ENV PYTHONUNBUFFERED=1

# Keep base image simple/stable for Codespaces build.
RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
