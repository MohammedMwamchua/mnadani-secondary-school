from rest_framework import serializers

from .models import ContactMessage, HomeBannerSlide, QuickLinkCard, SiteInfo

class SiteInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteInfo
        fields = [
            "school_name", "vision", "motto", "mission", "introduction", "headteacher_message",
            "necta_centre_number", "founded_year", "school_type",
            "address", "po_box", "email", "phone", "office_hours", "administered_by",
            "entrance_signboard_photo",
        ]

class HomeBannerSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeBannerSlide
        fields = ["id", "title", "text", "photo", "alt_text", "order"]

class QuickLinkCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuickLinkCard
        fields = ["id", "title", "text", "photo", "link_path", "order"]

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "phone", "message"]
