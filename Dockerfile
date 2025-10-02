# Dockerfile
FROM php:8.2-apache

# Instalar pdo_mysql y habilitar mod_rewrite
RUN apt-get update \
  && apt-get install -y --no-install-recommends libzip-dev unzip \
  && docker-php-ext-install pdo_mysql \
  && a2enmod rewrite \
  && rm -rf /var/lib/apt/lists/*

# Copiar el proyecto (nota: durante desarrollo también montaremos en volumen)
COPY . /var/www/html

# Ajustar permisos básicos
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
