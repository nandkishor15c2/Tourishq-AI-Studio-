---
name: domain-ssl
description: Configure custom domains, SSL/TLS certificates, DNS settings, and HTTPS for web applications. Use this skill whenever the user wants to connect a custom domain, configure DNS records, set up HTTPS, configure Nginx/Caddy as reverse proxy, or troubleshoot domain/SSL issues. Trigger for "custom domain", "DNS setup", "SSL certificate", "HTTPS", "Nginx config", "reverse proxy", "A record", "CNAME", or "Let's Encrypt".
---

# Domain & SSL Setup

Configure custom domains and HTTPS for production deployments.

## DNS Record Types

| Record | Purpose | Example |
|--------|---------|---------|
| **A** | Domain → IP address | `myapp.com → 1.2.3.4` |
| **AAAA** | Domain → IPv6 | `myapp.com → 2001:db8::1` |
| **CNAME** | Domain → another domain | `www → myapp.com` |
| **MX** | Email routing | `myapp.com → mail.myapp.com` |
| **TXT** | Verification, SPF, DKIM | `v=spf1 include:...` |

## Platform-Specific Setup

### Vercel
1. Dashboard → Domains → Add domain
2. Add DNS records at your registrar:
   - **Root domain**: A record → `76.76.21.21`
   - **www**: CNAME → `cname.vercel-dns.com`
3. SSL auto-provisioned (Let's Encrypt)

### Netlify
1. Site Settings → Domain management → Add domain
2. DNS records:
   - **Root**: A → `75.2.60.5`
   - **www**: CNAME → `[your-site].netlify.app`

---

## Nginx Reverse Proxy + Certbot SSL

```nginx
# /etc/nginx/sites-available/myapp
server {
    listen 80;
    server_name myapp.com www.myapp.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name myapp.com www.myapp.com;

    ssl_certificate /etc/letsencrypt/live/myapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myapp.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Referrer-Policy strict-origin-when-cross-origin;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

```bash
# Install Certbot and get SSL certificate
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d myapp.com -d www.myapp.com

# Auto-renew (add to cron)
0 12 * * * /usr/bin/certbot renew --quiet
```

## Caddy (Auto-HTTPS, Simpler)

```caddyfile
# /etc/caddy/Caddyfile
myapp.com, www.myapp.com {
    reverse_proxy localhost:3000

    header {
        X-Frame-Options DENY
        X-Content-Type-Options nosniff
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
    }

    @static path /_next/static/*
    handle @static {
        reverse_proxy localhost:3000
        header Cache-Control "public, max-age=31536000, immutable"
    }
}
```

Caddy automatically obtains and renews Let's Encrypt SSL certificates.

## SSL Checklist
- [ ] HTTP redirects to HTTPS (301)
- [ ] www redirects to root (or vice versa) consistently  
- [ ] HSTS header enabled
- [ ] SSL certificate valid and auto-renewing
- [ ] Test with: `ssl-checker.com` or `ssllabs.com/ssltest`
