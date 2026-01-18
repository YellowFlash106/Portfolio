# Security Configuration

This document outlines the security measures implemented in the portfolio application.

## Security Features

### 1. Environment-Based Route Protection
- Admin routes (POST, PUT, DELETE) are only available in development mode
- In production, these routes return 404, preventing unauthorized content modification

### 2. Input Validation & Sanitization
- Contact form inputs are sanitized and validated
- Email format validation using regex
- Input length limits to prevent buffer overflow attacks
- XSS protection through input trimming and validation

### 3. Rate Limiting
- General API rate limiting: 100 requests per 15 minutes per IP
- Contact form specific limiting: 5 submissions per hour per IP
- Prevents abuse and DoS attacks

### 4. Security Headers (Helmet)
- Content Security Policy (CSP) configured
- XSS protection enabled
- Clickjacking protection
- Secure cookie settings

### 5. CORS Configuration
- Restricted origins in production
- Proper preflight handling
- Credential support configured

### 6. Error Handling
- Production errors don't leak sensitive information
- Development mode provides detailed error logging
- Consistent error response format

### 7. Data Protection
- No sensitive data logging in production
- API responses sanitized for logging
- Contact form data properly validated before storage

## Production Deployment Checklist

- [ ] Set `NODE_ENV=production` in environment
- [ ] Configure allowed CORS origins
- [ ] Set up proper domain in CSP headers
- [ ] Enable HTTPS
- [ ] Configure proper logging (not to console in production)
- [ ] Set up monitoring and alerting
- [ ] Regular security updates of dependencies

## Security Monitoring

- Rate limiting violations are logged
- Failed authentication attempts tracked
- Input validation failures monitored
- Regular dependency vulnerability scans

## Contact

For security concerns, please contact the repository maintainer.