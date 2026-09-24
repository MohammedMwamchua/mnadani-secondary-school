// Live preview for NicePhotoWidget and NiceAvatarWidget (core/admin_widgets.py).
// Progressive enhancement only — the plain file input still works fine
// without this; it just shows the newly chosen image immediately instead
// of making the admin wait until save to see what they picked.
document.addEventListener("change", function (event) {
  var input = event.target;
  if (!input.classList) return;

  if (input.classList.contains("mn-photo-widget__input")) {
    previewDropzone(input);
  } else if (input.classList.contains("mn-avatar-widget__input")) {
    previewAvatar(input);
  }
});

function readAsDataUrl(file, onLoad) {
  var reader = new FileReader();
  reader.onload = function (loadEvent) {
    onLoad(loadEvent.target.result);
  };
  reader.readAsDataURL(file);
}

function previewDropzone(input) {
  var widget = input.closest(".mn-photo-widget");
  var file = input.files && input.files[0];
  if (!widget || !file) return;

  readAsDataUrl(file, function (dataUrl) {
    var current = widget.querySelector(".mn-photo-widget__current");
    var img = widget.querySelector(".mn-photo-widget__img");

    if (!current) {
      current = document.createElement("div");
      current.className = "mn-photo-widget__current";
      widget.insertBefore(current, widget.firstChild);
    }
    if (!img) {
      img = document.createElement("img");
      img.className = "mn-photo-widget__img";
      current.insertBefore(img, current.firstChild);
    }
    img.src = dataUrl;

    var label = widget.querySelector(".mn-photo-widget__label");
    if (label) label.textContent = "Replace this photo";

    var hint = widget.querySelector(".mn-photo-widget__hint");
    if (hint) hint.textContent = file.name;
  });
}

function previewAvatar(input) {
  var widget = input.closest(".mn-avatar-widget");
  var file = input.files && input.files[0];
  if (!widget || !file) return;

  readAsDataUrl(file, function (dataUrl) {
    var circle = widget.querySelector(".mn-avatar-widget__circle");
    var placeholder = widget.querySelector(".mn-avatar-widget__placeholder");
    var img = widget.querySelector(".mn-avatar-widget__img");

    if (placeholder) placeholder.remove();
    if (!img) {
      img = document.createElement("img");
      img.className = "mn-avatar-widget__img";
      circle.insertBefore(img, circle.firstChild);
    }
    img.src = dataUrl;
    if (circle) circle.classList.add("mn-avatar-widget__circle--filled");

    var label = widget.querySelector(".mn-avatar-widget__label");
    if (label) label.textContent = "Photo selected";

    var hint = widget.querySelector(".mn-avatar-widget__hint");
    if (hint) hint.textContent = file.name;
  });
}
