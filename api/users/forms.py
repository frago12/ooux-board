from django import forms
from django.contrib.auth.models import User


class UserForm(forms.ModelForm):
    email = forms.EmailField()
    username = forms.CharField(min_length=3)
    password = forms.CharField(min_length=4)
    password2 = forms.CharField(min_length=4)

    class Meta:
        model = User
        fields = ["username", "email"]

    def clean_password2(self):
        data = self.cleaned_data
        if data["password2"] != data["password"]:
            raise forms.ValidationError("Passwords don't match")
        return data["password2"]
