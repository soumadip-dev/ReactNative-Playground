# What is a Native Component?

Actual UI elements provided by the OS (Android / iOS) you are working on.

**Like:**

- Android → View, TextView, Button
- iOS → UIView, UILabel, UIButton

## Characteristics

1. They are written in native languages like Swift, Objective-C, Java, or Kotlin.
2. Exist only inside the Android or iOS layer.
3. Are not directly accessible in the React Native layer.

---

# What are Core Components?

Components provided by React Native; we mainly code with core components in React Native.

## Examples

- View
- Text
- Image
- ScrollView
- Pressable

They are written in JavaScript and act as a cross-platform interface, so we write one component that works on both Android and iOS. Actually, React Native under the hood converts the core component to native components.

## Mapping Examples

### iOS

- View → UIView
- Text → UILabel
- Image → UIImageView

### Android

- View → android.view.View
- Text → android.widget.TextView
- Image → android.widget.ImageView

---

# Some Important Notes about React Native Styling

- Styling is JavaScript-based.
- Flexbox is the only layout system (Grid is not available till now).
- Default flex direction is **column** (which is **row** in the case of web).

---

# List and Data Display Component

In web, we use `map()` to render a list of items:

```jsx
{
  data.map(item => <h2 key={item.id}>{item.name}</h2>);
}
```

We can use the same thing in React Native, but it is not recommended. Here's why:

- `map()` method loads the full list at once.
- On mobile, we cannot see the full list at once, but if it loads fully, it will consume a lot of battery and degrade the app experience by slowing down (high memory usage).
- Results in: slow scrolling, bad user experience.

So React Native provides two best solutions for this:

1. FlatList
2. SectionList

---

# FlatList (Simple List)

FlatList component renders only the items currently in view, making it highly performant for long lists.

## Some commonly used props of FlatList

### `data`

The data source for rendering the UI.

```jsx
data = { vegetables };
```

### `renderItem`

Defines the UI we are going to render.

```jsx
renderItem={({ item }) => (
  <Text style={styles.title}>{item.name}</Text>
)}
```

### `ListHeaderComponent`

Header component on the top of the list.

### `ListFooterComponent`

Footer component at the bottom of the list.

### `ItemSeparatorComponent`

Separator component between items.

### `ListEmptyComponent`

Show this UI when the list is empty.

### `horizontal`

Set to `true` for horizontal scrolling.

### `keyExtractor`

Custom key extraction logic for list items.

---

# SectionList

A performant component designed for rendering sectioned lists.

## Some commonly used props of SectionList

### `sections`

Array of section objects containing data.

### `renderItem`

Defines the UI for each item in the section.

### `renderSectionHeader`

Renders the header for each section.

### `keyExtractor`

Custom key extraction logic for list items.

---

# Image

Inside the `source` prop, we have to provide the URI of the image.

## Local Image

Use `require()` with a relative path.

```jsx
source={require('./assets/image.png')}
```

## Remote Image

Use a URI string.

```jsx
source={{ uri: item?.picture }}
```

## Important Note

- For local images, React Native can automatically understand the image dimensions and display them correctly.
- For remote images, you must provide the height and width in the `style` prop; otherwise, React Native cannot determine the size and the image won't display.

### Example

```jsx
<Image source={{ uri: 'https://example.com/image.png' }} style={{ width: 200, height: 200 }} />
```

---

# ScrollView

By default, scrolling is not available on mobile screens. You have to wrap the content inside `ScrollView`.

## Commonly used props

### `showsVerticalScrollIndicator`

Show or hide the vertical scroll indicator (`true`/`false`).

### `contentContainerStyle`

Style for the container inside `ScrollView` (useful for padding).

### Example

```jsx
<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 10 }}>
  {/* Content here */}
</ScrollView>
```

---

# SafeAreaView

When you put content on the mobile screen, it can go under the notch or other areas where it's not properly visible. To avoid this, we use `SafeAreaView`.

## Commonly used props

### `edges`

Specify which edges should apply safe area padding.

Available options:

- `top`
- `right`
- `bottom`
- `left`

By default, all sides are protected.

### Example

```jsx
<SafeAreaView edges={['top', 'bottom']}>{/* Content here */}</SafeAreaView>
```

---

navigation pattern
|
|- Stack
|
|- Tabs
|
|- Drawer
|
|- Model

React Navigatio : Component based routing system
Expo Router: File based routing

why react navigation if we already have expo router because it is core navigation understanding it give in depth idea of the navigation of the react native app. because expo under the whood using this navigation so we can understand properly how file based routing working under the whood.

---
