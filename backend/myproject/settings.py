
import os

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    'localhost',
    'pong42.azurewebsites.net',
    '127.0.0.1',
    'transcendence-beige.vercel.app',  # Add your domain name here
    'four2trans-backend.onrender.com',  # Add Render domain here
    'zc5vlf-3000.csb.app',
    'mwlvdq-3000.csb.app',
    'transcendence-git-draft-exciting-yalow-hubble42.vercel.app',
    'y494mt-3000.csb.app',
    '8ff524ec-5dfb-4374-9125-a53385e1cc63-00-14kx31mg03i0t.spock.replit.dev',
    'transcendence-bynd-asb2ihs6--3000--6f234770.local-credentialless.webcontainer.io', 
    'localhost',
    'localhost:3000',
    'transcendence-bynd--3000--6f234770.local-corp.webcontainer.io',
    'api.intra.42.fr',
]


SOCKETIO_HOST = "0.0.0.0"
SOCKETIO_PORT = 8001
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'myapp',
    'channels',
    'socketio',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'myproject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'myapp', 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'myproject.wsgi.application'
ASGI_APPLICATION = 'myproject.routing.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        #'HOST': 'localhost',
        'HOST': os.getenv('DB_HOST'),
        'PORT': '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # Add additional authentication classes as needed
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
        # Add additional permission classes as needed
    ),
}


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

CSRF_TRUSTED_ORIGINS = ['http://pong42.azurewebsites.net','https://pong42.azurewebsites.net','http://localhost:3000','http://localhost','https://transcendence-beige.vercel.app','https://y494mt-3000.csb.app','https://transcendence-git-draft-exciting-yalow-hubble42.vercel.app/','https://mwlvdq-3000.csb.app','http://8ff524ec-5dfb-4374-9125-a53385e1cc63-00-14kx31mg03i0t.spock.replit.dev','http://transcendence-bynd-asb2ihs6--3000--6f234770.local-credentialless.webcontainer.io', 'http://transcendence-bynd--3000--6f234770.local-corp.webcontainer.io','https://api.intra.42.fr']

CORS_ALLOWED_ORIGINS = ['https://pong42.azurewebsites.net','http://pong42.azurewebsites.net','http://localhost:3000','http://localhost','https://transcendence-beige.vercel.app','https://y494mt-3000.csb.app','https://mwlvdq-3000.csb.app','http://8ff524ec-5dfb-4374-9125-a53385e1cc63-00-14kx31mg03i0t.spock.replit.dev','http://transcendence-bynd-asb2ihs6--3000--6f234770.local-credentialless.webcontainer.io', 'http://transcendence-bynd--3000--6f234770.local-corp.webcontainer.io','https://api.intra.42.fr']

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CSRF_COOKIE_SECURE = False
APPEND_SLASH=False
