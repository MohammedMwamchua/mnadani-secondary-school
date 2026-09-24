from django import forms

class NicePhotoWidget(forms.ClearableFileInput):

    template_name = "admin/widgets/nice_photo_input.html"

    class Media:
        js = ("admin/mn-photo-widget.js",)

class NiceAvatarWidget(forms.ClearableFileInput):

    template_name = "admin/widgets/nice_avatar_input.html"

    class Media:
        js = ("admin/mn-photo-widget.js",)
