# Cisco-RoomOS-State-Action

## Cisco RoomOS Device Configuration Management using Infrastructure as Code (IaC)

Uses a Github action to push desired state to Cisco RoomOS devices using Device-View.com as the integration service with Webex Xapi.

---

## Components

### Example workflow.yml

```
      - name: Call Device Endpoint
        id: apiCall
        uses: 'DeclanRodgers/Cisco-RoomOS-State-Action@1.0'
        with:
            token-data: ${{ secrets.JWT_TOKEN }}
            api-endpoint: "https://mpp.unifiedfx.com/api/devices/{id}"
```

### JWT Token

Stored as a repository secret (Settings > Secrets and Variables > Actions).
Default Repository Secret name is `JWT_TOKEN`.

### `api-endpoint`

_Optional_:
The endpoint to call for interactions with MPP devices.
The default is shown in example above.

### `destinations.csv`

List of Device MAC addresses to call.

### `commands.csv`

xCommands to send to a Device.
