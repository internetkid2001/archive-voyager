# Unraid Deployment Guide for IA-Downloader

## Container Configuration

### Basic Settings
- **Name**: `ia-downloader`
- **Repository**: `ghcr.io/internetkid2001/ia-downloader:latest`
- **Network Type**: `bridge`
- **Console shell command**: `bash`

### Port Mappings
- **Host Port**: `3005` → **Container Port**: `3000`
  - Access the web interface at: `http://YOUR_UNRAID_IP:3005`

### Path Mappings (Optional)
- **Host Path**: `/mnt/user/appdata/ia-downloader` → **Container Path**: `/app/data`
  - For storing any configuration files or cached data

### Environment Variables
- **Variable**: `NODE_ENV` → **Value**: `production`

### Advanced Settings
- **Restart Policy**: `unless-stopped`
- **Privileged**: `No`
- **Host Path 1**: `/mnt/user/appdata/ia-downloader/` → **Container Path**: `/app/data`

## Quick Setup Steps

1. **Open Unraid Web Interface**
   - Navigate to the **Docker** tab
   - Click **Add Container**

2. **Fill in Container Settings**
   ```
   Name: ia-downloader
   Repository: ghcr.io/internetkid2001/ia-downloader:latest
   Network Type: bridge
   Console shell command: bash
   ```

3. **Configure Port Mapping**
   ```
   Host Port: 3005
   Container Port: 3000
   Connection Type: TCP
   ```

4. **Set Environment Variables**
   ```
   Variable: NODE_ENV
   Value: production
   ```

5. **Configure Restart Policy**
   ```
   Restart Policy: unless-stopped
   ```

6. **Apply Configuration**
   - Click **Apply** to create and start the container

## Accessing the Application

Once the container is running, you can access the IA-Downloader web interface at:
- **Local Access**: `http://localhost:3005`
- **Network Access**: `http://YOUR_UNRAID_IP:3005`
- **Example**: `http://192.168.0.144:3005`

## Updating the Container

To update to a newer version:

1. **Stop the Container**
   - Go to Docker tab in Unraid
   - Click the container name
   - Click **Stop**

2. **Edit Container**
   - Click **Edit**
   - Change **Repository** to: `ghcr.io/internetkid2001/ia-downloader:v1.0.1` (or latest)
   - Click **Apply**

3. **Unraid will automatically**
   - Pull the new image
   - Remove the old container
   - Start the new container

## Troubleshooting

### Container Won't Start
- Check logs in Docker tab → Container name → Logs
- Verify port 3005 is not in use by another service
- Ensure the image was pulled correctly

### Port Already in Use
If port 3005 conflicts with another service, change the host port:
- Edit container → Change Host Port to `3006` or another unused port
- Update your bookmark/access URL accordingly

### Health Check
The container includes a built-in health check. In the Docker tab, you should see:
- **Status**: `Up (healthy)` when running properly
- **Status**: `Up (unhealthy)` if there are issues

## Container Features

- **Multi-stage build** for optimal image size
- **Non-root user** for security
- **Health checks** for monitoring
- **Automatic restart** on failure
- **Production-optimized** serving

## Network Configuration

The container is configured for bridge networking and should work with:
- Default Unraid network settings
- Custom bridge networks
- VPN containers (if needed)

## Security Notes

- Container runs as non-root user (nextjs:nodejs)
- No privileged access required
- Only exposes necessary port (3000)
- Built-in health monitoring