# Cisco-RoomOS-State-Action

## Cisco RoomOS Device Configuration Management using Infrastructure as Code (IaC)

Uses a Github action to push desired state to Cisco RoomOS devices using Device-View.com as the integration service with Webex Xapi.

## Components

### JWT Token

Stored as a repository secret (Settings > Secrets and Variables > Actions).
Default Repository Secret name is `JWT_TOKEN`.

### `destinations.csv`

List of Device MAC addresses to call.

### `commands.csv`

xCommands to send to s Device.
