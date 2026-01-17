## important
my explanation and logic and also the folder structure i followed
mostly you will find comments in the code but explaining here as well


### Current Problem in normal pinch to zoom

By default, scaling transformations occur around the center of a view.
When implementing pinch-to-zoom, this causes the image to expand outward from the center, making the pixel under the user’s fingers drift away.

The goal is to **keep the focal point (finger position) visually stationary during zoom**.

---

### MY Approach

To achieve focal-point zoom, scaling must be accompanied by a compensating translation.

The idea is simple:

> Scaling pushes pixels away from the center.
> We translate the image back by exactly the amount scaling moved the focal point.

---

### Coordinate Normalization

All calculations are performed relative to the image center:

```ts
focalX = fingerX - centerX
focalY = fingerY - centerY
```

This converts touch coordinates into an image-centered coordinate space, which simplifies the math.

---

### Incremental Scaling

Instead of applying absolute scale values, incremental scale change is computed:

```ts
scaleChange = nextScale / currentScale
```

This avoids visual jumps and ensures smooth continuous zooming.

---

### Translation Compensation Formula

The key formula used to preserve the focal point is:

```ts
translateX += focalX * (1 - scaleChange)
translateY += focalY * (1 - scaleChange)
```

#### Why this works:

* When `scaleChange > 1`, the image expands outward
* `(1 - scaleChange)` becomes negative
* Translation moves the image in the opposite direction of expansion
* The focal point remains visually fixed under the user’s fingers

---

### Example

If:

* Current scale = `1`
* Next scale = `2`
* Focal point = `50px` from center

Without translation, the point would move to `100px`.
With translation compensation:

```
translate += 50 × (1 - 2) = -50
```

Final position remains `50px`.

---

### Pan Gesture Logic

Panning is enabled **only when the image is zoomed**: which can also be changed but mostly this 
is the behavior

```ts
if (scale <= 1) return;
```

This prevents empty space from appearing when the image is at its default scale.

---

### Result

* Zoom occurs relative to finger position
* No visual drift during pinch
* Smooth interaction with no gesture conflicts
* Production-ready focal zoom behavior
