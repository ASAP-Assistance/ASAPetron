FROM php:8.1-apache

# Enable Apache modules
RUN a2enmod rewrite

# Copy app files to Apache root
COPY . /var/www/html/

# Set correct ownership and permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80
