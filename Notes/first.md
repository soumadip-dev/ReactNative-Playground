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

# Navigation in React Native

Navigation is one of the most important parts of any mobile application. It allows users to move between different screens in a structured way.

## Common Navigation Patterns

There are four major navigation patterns used in React Native applications:

```text
Navigation
│
├── Stack
├── Tabs
├── Drawer
└── Modal
```

Each pattern serves a different purpose depending on the user experience you want to build.

---

# React Navigation vs Expo Router

React Native developers mainly use two navigation solutions:

| React Navigation                                  | Expo Router                                                                            |
| ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Component-based routing                           | File-based routing                                                                     |
| You manually define navigators and screens.       | Routes are automatically created from the folder structure inside the `app` directory. |
| Gives full control over navigation configuration. | Simpler and faster to set up in Expo projects.                                         |

## Why Learn React Navigation if Expo Router Already Exists?

Even if you're building apps with **Expo Router**, learning **React Navigation** is highly recommended.

### Why?

- Expo Router is **built on top of React Navigation**.
- Understanding React Navigation helps you understand **how navigation works under the hood**.
- Makes debugging navigation issues much easier.
- Helps when working on existing React Native projects that don't use Expo Router.
- Gives a stronger understanding of concepts like:
  - Stack Navigation
  - Tab Navigation
  - Drawer Navigation
  - Navigation State
  - Screen Lifecycle

---

# React Navigation (Traditional React Native)

> **Note**
>
> Before Expo SDK **56**, React Navigation was commonly used directly in Expo projects.
>
> Starting from **Expo SDK 56**, Expo Router is the recommended navigation solution for Expo apps.

---

# Stack Navigator

A **Stack Navigator** manages screens in a **Last In, First Out (LIFO)** order.

Whenever you navigate to a new screen, it is pushed onto the top of the stack. Pressing the back button pops the current screen and returns to the previous one.

## Best Use Cases

- Login Flow
- Product Details
- Settings
- Profile Pages
- Multi-step Forms

## Basic Example

```tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
```

---

## Navigating Between Screens

React Navigation provides multiple ways to navigate.

### Using `Link`

```tsx
import { Link } from '@react-navigation/native';

<Link to={{ screen: 'Profile' }}>Go to Profile</Link>;
```

---

### Using `useNavigation`

```tsx
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />;
};
```

---

# Bottom Tab Navigator

A **Bottom Tab Navigator** displays a tab bar at the bottom of the screen that allows users to quickly switch between top-level screens.

This navigation pattern is commonly used in applications like:

- Instagram
- WhatsApp
- Facebook

## Example

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '',
        tabBarInactiveTintColor: '',
        tabBarStyle: {},
        headerStyle: {},
        headerTintColor: '',
        headerTitleStyle: {},
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />

      {/* More screens */}
    </Tab.Navigator>
  );
}
```

---

# Drawer Navigator

A **Drawer Navigator** displays a navigation panel that slides in from the side of the screen.

Users can open it by:

- Swiping from the edge
- Tapping the menu (hamburger) icon

It is useful when an app has many top-level screens.

## Example

```tsx
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />

      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
```

---

# Modal Navigation

A **Modal** is a temporary screen that appears on top of the current screen.

Unlike normal navigation, the underlying screen remains visible behind the modal.

Use modals only when user attention is immediately required.

## Common Use Cases

- Login prompt
- Confirmation dialogs
- Payment screens
- Terms & Conditions
- Filters
- Image Preview

## Example

```tsx
<Stack.Screen
  name="Modal"
  component={ModalScreen}
  options={{
    presentation: 'modal',
  }}
/>
```

The important configuration is:

```tsx
presentation: 'modal';
```

This tells React Navigation to present the screen as a modal instead of a normal stack screen.

---

# Choosing the Right Navigation Pattern

| Navigation Type | Best For                                                   |
| --------------- | ---------------------------------------------------------- |
| **Stack**       | Moving between related screens (Home → Details → Checkout) |
| **Bottom Tabs** | Switching between major sections of the app                |
| **Drawer**      | Apps with many top-level pages or settings                 |
| **Modal**       | Temporary screens requiring user attention                 |
