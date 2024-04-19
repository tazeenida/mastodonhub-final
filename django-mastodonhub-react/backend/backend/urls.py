from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from mastodonhub import views

# Define the router for mastodonhub endpoints
router_mastodon_clubs_events = routers.DefaultRouter()
router_mastodon_clubs_events.register(r'dashboard',views.DashboardView)
router_mastodon_clubs_events.register(r'clubs', views.ClubsView)
router_mastodon_clubs_events.register(r'events', views.EventsView)

# Define urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/mastodonhub/', include(router_mastodon_clubs_events.urls)), 
]