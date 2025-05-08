
# P2PDeliverySite

**Frontend of the P2PDelivery Project**  
This Angular-based frontend interfaces with the [P2PDelivery](https://github.com/minamichael14/P2PDelivery), a peer-to-peer delivery platform built with ASP.NET Core. Together, they provide a full-stack solution for creating, managing, and tracking delivery requests in real time.

## Overview

P2PDeliverySite is a peer-to-peer delivery platform built with Angular that connects people who need items delivered with individuals willing to provide delivery services. The application facilitates the creation of delivery requests, application to fulfill those requests, and communication between users.

This project was developed as part of the graduation project for the Full Stack Web Development using .NET track at the Information Technology Institute (ITI), Egypt.

## Technologies Used

- **Angular (v19.2.x)** `README.md:3`
- **Bootstrap 5** `package.json:28`
- **SignalR** for real-time communication `package.json:24`
- **FontAwesome** icons `package.json:21-23`
- **JWT** for authentication `package.json:30`

## Features

### User Management

- Registration and authentication system `login.component.ts:15-149`
- User profile management `app.routes.ts:33-37`
- Profile editing `app.routes.ts:65-71`

### Delivery Requests

- Create delivery requests with details including title, description, weight, locations, and price range `delivery-request-creation.component.ts:38-49`
- Upload images for delivery items `delivery-request-creation.component.ts:52-57`
- Browse all delivery requests `app.routes.ts:49-54`
- View personal delivery requests `app.routes.ts:72-78`
- Track delivery progress `app.routes.ts:92-97`

### Delivery Applications

- Apply to fulfill delivery requests `add-application.component.ts:26-52`
- Offer custom prices `add-application.component.ts:28-31`
- View personal applications `app.routes.ts:79-85`
- Manage accepted applications `app.routes.ts:86-91`

### Communication

- Real-time chat between users `chat.service.ts:12-113`
- Notifications system

## Installation and Setup

### Prerequisites

- Node.js and npm
- Angular CLI

### Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/minamichael14/P2PDeliverySite.git
cd P2PDeliverySite
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
ng serve
```

4. Navigate to `http://localhost:4200/` in your browser. `README.md:13`

## Building for Production

Run the following command to build the project:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory. `README.md:37`

## Project Structure

The application follows a feature-based structure:

- **Core**: Contains essential services, interceptors, and utilities
- **Features**: Organized by domain functionality
  - User management
  - Delivery requests
  - Applications for delivery requests
  - Chat functionality
  - Notifications
- **Shared**: Reusable components, directives, and pipes
- **Models**: Data transfer objects and interfaces

## Collaborators
- [Kyrillos Adel](https://github.com/kyrillos-adel)
- [Mina Michael](https://github.com/minamichael14)
- [Omnia Nassef](https://github.com/omn22)
- [Rahil Raafat](https://github.com/RahilRafat)
- [Rawan Ragab](https://github.com/rawanragab44)

## Contact
For any issues or inquiries, contact **Kyrillos Adel** at kyrillosadelfahim@gmail.com

