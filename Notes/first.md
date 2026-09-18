# What is a Native Component?

Actual UI elements provided by the OS (Android / iOS) you are working on.

**Examples:**

- Android → View, TextView, Button
- iOS → UIView, UILabel, UIButton

## Characteristics

1. They are written in native languages like Swift, Objective-C, Java, or Kotlin.
2. They exist only inside the Android or iOS layer.
3. They are not directly accessible from the React Native layer.

---

# What are Core Components?

Components provided by React Native; we mainly code with core components in React Native.

## Examples

- View
- Text
- Image
- ScrollView
- Pressable

They are written in JavaScript and act as a cross-platform interface, so we write one component that works on both Android and iOS. React Native actually converts these core components to native components under the hood.

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
- Flexbox is the primary layout system (Grid is not available as a layout system in React Native).
- The default flex direction is **column** (which is **row** on the web).

---

# List and Data Display Components

On the web, we use `map()` to render a list of items:

```jsx
{
  data.map(item => <h2 key={item.id}>{item.name}</h2>);
}
```

We can use the same thing in React Native, but it is not recommended for large lists. Here's why:

- The `map()` method renders the full list at once.
- On mobile, we cannot see the full list at once, but if the entire list is rendered, it can consume more memory and battery and degrade the app experience.
- This can result in slow scrolling and a poor user experience.

So React Native provides two solutions for this:

1. FlatList
2. SectionList

---

# FlatList (Simple List)

The FlatList component renders only the items currently in view, making it highly performant for long lists.

## Some Commonly Used Props of FlatList

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

Header component at the top of the list.

### `ListFooterComponent`

Footer component at the bottom of the list.

### `ItemSeparatorComponent`

Separator component between items.

### `ListEmptyComponent`

Shows this UI when the list is empty.

### `horizontal`

Set to `true` for horizontal scrolling.

### `keyExtractor`

Custom key extraction logic for list items.

---

# SectionList

A performant component designed for rendering sectioned lists.

## Some Commonly Used Props of SectionList

### `sections`

An array of section objects containing data.

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
- For remote images, you must provide the height and width in the `style` prop; otherwise, React Native cannot determine the size, and the image won't display.

### Example

```jsx
<Image source={{ uri: 'https://example.com/image.png' }} style={{ width: 200, height: 200 }} />
```

---

# ScrollView

By default, scrolling is not available on mobile screens. You have to wrap the content inside `ScrollView`.

## Commonly Used Props

### `showsVerticalScrollIndicator`

Shows or hides the vertical scroll indicator (`true`/`false`).

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

When you put content on the mobile screen, it can go under the notch or other areas where it is not properly visible. To avoid this, we use `SafeAreaView`.

## Commonly Used Props

### `edges`

Specifies which edges should apply safe area padding.

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

| React Navigation                                        | Expo Router                                                     |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| Component-based navigation                              | File-based routing                                              |
| You manually define navigators and screens              | Routes are automatically created from the file/folder structure |
| Gives fine-grained control over navigator configuration | Makes routing and deep linking simpler in Expo projects         |

Expo currently recommends Expo Router for Expo projects, and new Expo projects created with `create-expo-app` include Expo Router by default.

---

# Expo Router

**Expo Router** is a file-based routing library for Expo and React Native applications.

Instead of manually registering every screen in a navigator, Expo Router uses the files and folders inside the application's routing directory to automatically create routes.

For example:

```text
src/
└── app/
    ├── index.tsx
    ├── profile.tsx
    └── settings.tsx
```

This creates:

```text
/           → index.tsx
/profile    → profile.tsx
/settings   → settings.tsx
```

Expo Router also supports nested routes, dynamic routes, route groups, layouts, tabs, drawers, stacks, modals, and deep linking.

---

# What is File-Based Routing?

In traditional navigation, we usually define screens manually:

```tsx
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Profile" component={ProfileScreen} />
</Stack.Navigator>
```

We explicitly tell the navigator:

```text
Home → HomeScreen
Profile → ProfileScreen
```

With Expo Router, the file structure itself defines the routes.

```text
app/
├── index.tsx
└── products/
    ├── index.tsx
    └── details.tsx
```

Expo Router automatically understands:

```text
/                  → app/index.tsx
/products          → app/products/index.tsx
/products/details  → app/products/details.tsx
```

So the filesystem becomes part of the navigation structure.

## `index.tsx`

Represents the default route of a directory.

## `_layout.tsx`

is a special file in Expo Router. It is **not a screen itself**.
Instead, it defines how the routes inside its directory are organized and displayed.

For example:

```text
app/
├── _layout.tsx
├── index.tsx
└── profile.tsx
```

A root `_layout.tsx` can define the application's Stack:

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Stack>
  );
}
```

## `Link` Component

Expo Router provides the `Link` component for declarative navigation.

```tsx
import { Link } from 'expo-router';

export default function HomeScreen() {
  return <Link href="/profile">Go to Profile</Link>;
}
```

Clicking the link navigates to:

```text
/profile
```

The `Link` component is useful when navigation behaves similarly to a link.

For button-based or event-based navigation, you can use the router API.

## Router Object

Expo Router provides the `router` object for programmatic navigation.

- **router.push('/profile')**: Adds a new route to the navigation stack. The previous screen remains in the navigation history.
  Example: `Home → Profile`

- **router.replace('/home')**: Replaces the current route. This is useful mainly for authentication flows.
  Example: `Login → Replace → Home`

- **router.back()**: Navigates back to the previous screen.
  Example:

```text
Home → Profile → Settings
                  ↓
              router.back()
                  ↓
               Profile
```

---

# Nested Routes

Expo Router supports nested routes through directories. We can create deeper navigation structures simply by creating directories.

Example:

```text
app/
└── admin/
    └── users/
        └── roles/
            └── index.tsx
```

creates:

```text
/admin/users/roles
```

This is one of the main advantages of file-based routing: the directory structure naturally represents the route hierarchy.

---

# Dynamic Routes

Sometimes the route depends on dynamic data.

For example, suppose we have:

```text
/posts/1
/posts/2
/posts/3
```

We don't want to create:

```text
post1.tsx
post2.tsx
post3.tsx
```

Instead, we create one dynamic route:

```text
app/
└── posts/
    └── [postId].tsx
```

The `[postId]` represents a dynamic route parameter.

This single file can handle:

```text
/posts/1
/posts/2
/posts/3
/posts/100
```

and so on.

## Accessing the Dynamic Parameter

Use `useLocalSearchParams()`:

```tsx
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function PostScreen() {
  const { postId } = useLocalSearchParams();

  return <Text>Post ID: {postId}</Text>; // suppose /posts/10 will print: Post ID: 10
}
```

---

# Catch-All Routes

Sometimes we don't know how many URL segments will exist.

For example:

```text
/admin/users/roles
/admin/reports/logs/date
/admin/settings/security
```

Instead of creating separate routes for every possible path, we can use a **catch-all route**.

Create:

```text
app/
└── [...segments].tsx
```

The `[...]` syntax means the route can capture multiple segments.

Example:

```tsx
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function CatchAllScreen() {
  const { segments } = useLocalSearchParams();

  return <Text>{JSON.stringify(segments)}</Text>;
}
```

For example:

```text
/admin/users/roles
```

The `segments` value can represent:

```text
["admin", "users", "roles"]
```

This is useful when the number of nested route segments is variable.

---

# Custom Unmatched Route

Sometimes a user navigates to a route that does not exist.

For example:

```text
/something-that-does-not-exist
```

Expo Router provides:

```text
+not-found.tsx
```

for handling unmatched routes.

```tsx
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View>
      <Text>Page Not Found</Text>
    </View>
  );
}
```

The `+` prefix has special meaning in Expo Router. `+not-found.tsx` is specifically used for routes that don't match any defined route.

---

# Route Groups

Route groups are created using parentheses:

```text
(auth)
(tabs)
(admin)
```

Example:

```text
app/
├── (auth)/
│   ├── login.tsx
│   └── register.tsx
│
└── index.tsx
```

The `(auth)` folder is used only for organizing the navigation structure.

It **does not become part of the URL**.

Therefore:

```text
(auth)/login.tsx
```

creates:

```text
/login
```

not:

```text
/auth/login
```

Route groups are useful when you want to organize routes or apply a common layout without adding another URL segment.

---

# `Slot`

Sometimes we want a layout without creating a Stack, Tabs, or Drawer navigator.

For example, we may want:

```text
┌─────────────────────┐
│       Header        │
├─────────────────────┤
│                     │
│    Current Screen   │
│                     │
├─────────────────────┤
│       Footer        │
└─────────────────────┘
```

For this, Expo Router provides the `Slot` component.

```tsx
import { Slot } from 'expo-router';
import { SafeAreaView, View, Text } from 'react-native';

export default function Layout() {
  return (
    <SafeAreaView>
      <View>
        <Text>Header</Text>
      </View>

      <Slot />

      <View>
        <Text>Footer</Text>
      </View>
    </SafeAreaView>
  );
}
```

`<Slot />` acts as a **placeholder for the current child route**.

For example:

```text
app/
└── social/
    ├── _layout.tsx
    ├── index.tsx
    └── profile.tsx
```

The `Slot` inside `social/_layout.tsx` renders whichever child route is currently active.

Unlike `<Stack />`, `<Slot />` does not create a navigator. It simply renders the child route inside the layout.

---

# Stack Navigation with Expo Router

A Stack Navigator manages screens in a stack.

Example:

```text
Home
 ↓
Details
 ↓
Checkout
```

When a new screen is opened, it is pushed onto the stack.

When the user goes back, the current screen is removed from the top of the stack.

## Basic Setup

```text
app/
├── _layout.tsx
├── index.tsx
└── profile.tsx
```

`_layout.tsx`:

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack />;
}
```

Expo Router automatically treats the files inside the directory as routes in the Stack.

## Stack Screen Options

You can customize the header:

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack>
  );
}
```

Common options include:

```text
title
headerShown
headerStyle
headerTintColor
headerTitleStyle
presentation
```

---

# Modal with Stack

A screen can be presented as a modal using the `presentation` option.

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
```

---

# Tab Navigation with Expo Router

Tabs are useful for switching between the main sections of an application.

For example:

```text
Home | Search | Profile
```

With Expo Router, tabs are usually created inside a route group:

```text
app/
├── _layout.tsx
└── (tabs)/
    ├── _layout.tsx
    ├── index.tsx
    ├── settings.tsx
    └── profile.tsx
```

`(tabs)/_layout.tsx`:

```tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome name="cog" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
```

Because `(tabs)` is a route group, it does not appear in the URL.

The tabs can therefore represent:

```text
/
/settings
```

Expo Router's JavaScript `<Tabs>` navigator is configured inside a layout file, and the routes directly inside that directory become tabs.

- **Common Tab options**:

```text
tabBarActiveTintColor → Sets the color of the active tab.
tabBarInactiveTintColor → Sets the color of inactive tabs.
tabBarStyle → Customizes the style of the tab bar.
tabBarIcon → Provides the icon for a specific tab.
headerShown → Shows or hides the header.
title → Sets the title of the tab.
```

## Native Tabs

Expo Router also provides **Native Tabs**.

Native Tabs use the platform's native tab implementation instead of the JavaScript-based `<Tabs>` navigator.

This can provide a more platform-native look and behavior on Android and iOS.

Example:

`/(tabs)/_layout.tsx`

```tsx
import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="first">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="second">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

Here:

```text
sf → SF Symbols for Apple platforms
md → Material icons for Android
```

---

# Drawer Navigation

A Drawer Navigator displays a navigation panel that slides in from the side.

Example:

```text
app/
└── drawer/
    ├── _layout.tsx
    ├── index.tsx
    └── profile.tsx
```

`_layout.tsx`:

```tsx
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'Overview',
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
          title: 'Profile',
        }}
      />
    </Drawer>
  );
}
```

The files inside the directory become the Drawer routes.

---

# Expo Router Important File Conventions

| File / Folder       | Meaning                                                      |
| ------------------- | ------------------------------------------------------------ |
| `index.tsx`         | Default route of a directory                                 |
| `profile.tsx`       | Static route                                                 |
| `[id].tsx`          | Dynamic route                                                |
| `[...segments].tsx` | Catch-all dynamic route                                      |
| `_layout.tsx`       | Defines layout/navigation for child routes                   |
| `(auth)`            | Route group; does not appear in URL                          |
| `+not-found.tsx`    | Handles unmatched routes                                     |
| `Slot`              | Renders the current child route without creating a navigator |

---

# Expo Router Navigation Cheat Sheet

| Requirement                     | Expo Router                |
| ------------------------------- | -------------------------- |
| Navigate                        | `router.push('/profile')`  |
| Replace route                   | `router.replace('/home')`  |
| Go back                         | `router.back()`            |
| Declarative navigation          | `<Link href="/profile" />` |
| Get route params                | `useLocalSearchParams()`   |
| Stack                           | `<Stack />`                |
| Tabs                            | `<Tabs />`                 |
| Native Tabs                     | `<NativeTabs />`           |
| Drawer                          | `<Drawer />`               |
| Child-route placeholder         | `<Slot />`                 |
| Dynamic route                   | `[id].tsx`                 |
| Catch-all route                 | `[...segments].tsx`        |
| Route grouping                  | `(group)`                  |
| Unmatched route                 | `+not-found.tsx`           |
| Layout/navigation configuration | `_layout.tsx`              |

---

# Data Storage and File System

## Overview

Four main options for storing data locally:

1. **Async Storage**
2. **Expo Secure Store**
3. **Expo SQLite**
4. **Expo File System**

---

## 1. Async Storage

Saves data locally on the mobile device in **key-value** format, asynchronously.

- Good for storing **non-sensitive** data.

```js
await AsyncStorage.setItem(STORAGE_KEY, USERNAME);
const storedUsername = await AsyncStorage.getItem(STORAGE_KEY);
await AsyncStorage.removeItem(STORAGE_KEY);
```

---

## 2. Expo Secure Store

Encrypts and securely stores data in key-value format, locally on the device. Each Expo project has **separate storage**, so no app can access another app's data.

- Good for: API keys, tokens, passwords.

```js
await SecureStore.setItemAsync(STORAGE_KEY, USERNAME);
const storedUsername = await SecureStore.getItemAsync(STORAGE_KEY);
await SecureStore.deleteItemAsync(STORAGE_KEY);
```

**Optional authentication when saving data:**

```js
await SecureStore.setItemAsync(STORAGE_KEY, USERNAME, {
  requireAuthentication: true,
  authenticationPrompt: 'Authenticate to access your secret',
});
```

This will throw an error unless you configure `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-secure-store",
        {
          "configureAndroidBackup": true,
          "faceIDPermission": "Allow $(PRODUCT_NAME) to access your Face ID biometric data."
        }
      ]
    ]
  }
}
```

```json
{
  "expo": {
    "ios": {
      "config": {
        "usesNonExemptEncryption": false
      }
    }
  }
}
```

> Once configured, setting/getting items will require biometric authentication.

---

## 3. Expo SQLite

Add this to `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-router",
        {
          "headers": {
            "Cross-Origin-Embedder-Policy": "credentialless",
            "Cross-Origin-Opener-Policy": "same-origin"
          }
        }
      ]
    ]
  }
}
```

```js
import * as SQLite from 'expo-sqlite';

export const db = await SQLite.openDatabaseAsync('appdata.db');

await db.runAsync(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  );
`);
```

---

## 4. Expo File System

Provides access to the local file and directory system. Also allows downloading files from the network.

**Use cases:**

- Saving user-selected photos
- Exporting app data as documents
- Downloading a PDF
- Uploading a file to the backend

**Three key directories:**

| Directory        | Purpose                                                          |
| ---------------- | ---------------------------------------------------------------- |
| `Paths.document` | App's own private storage — for files you want to keep long-term |
| `Paths.cache`    | Temporary files — can be removed by the OS at any time           |
| `Paths.bundle`   | Read-only files bundled with the app (images, config, etc.)      |

---

Expo sensors
A library that provides access to device accelerometer biometer motion gyroscope light magnetometer and pedometer sensors.

Accelerometer
how the phone is moving or tilting in your physical space
three dimention
forword/back, left/right, up/down
want to make app respose to device movement
titlt to move a charcter in a game
shake to refresh
