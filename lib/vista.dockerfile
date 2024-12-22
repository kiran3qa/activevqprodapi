# Dockerfile
FROM perl:5.34
WORKDIR ./lib

# Install dependencies
COPY cpanfile .
RUN cpanm --installdeps .

# Copy app files
COPY . .

# Expose port for Mojolicious
EXPOSE 3000

# Start app
CMD ["morbo", "script/main.pm"]
