import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grow
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const GalleryContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6],
  },
}));

const LogoMedia = styled(CardMedia)({
  height: 140,
  objectFit: 'contain',
  backgroundColor: 'rgba(0,0,0,0.04)',
});

export default function AppsGallery() {
  const [pluginApps, setPluginApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    async function loadPluginApps() {
      try {
        const res = await fetch('/plugins/apps/apps');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const plugins = await res.json();
        const loaded = plugins.map(({ name, title, description }) => ({
          name,
          title,
          description: description || 'No description available',
          path: `/plugins/apps/${name}`,
          logo: `/plugins/apps/${name}/images/logo.png`,
        }));
        setPluginApps(loaded.filter(Boolean));
      } catch (err) {
        console.error('Failed to fetch plugin list:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPluginApps();
  }, []);

  return (
    <GalleryContainer>
      <Typography variant="h3" align="center" gutterBottom sx={{ mb: theme.spacing(3) }}>
        App Gallery
      </Typography>
      <Grid container spacing={4}>
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <StyledCard>
                  <CardActionArea>
                    <LogoMedia component="img" image="" alt="loading logo" />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Loading...
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Please wait
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </StyledCard>
              </Grid>
            ))
          : pluginApps.map((app, i) => (
              <Grid item xs={12} sm={6} md={4} key={app.name}>
                <Grow in timeout={300 + i * 100}>
                  <div>
                    <StyledCard elevation={2}>
                      <CardActionArea
                        component="a"
                        href={app.path}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LogoMedia
                          component="img"
                          image={app.logo}
                          alt={`${app.title} logo`}
                        />
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {app.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {app.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </StyledCard>
                  </div>
                </Grow>
              </Grid>
            ))}
      </Grid>
      {!loading && pluginApps.length === 0 && (
        <Box mt={4} textAlign="center">
          <Typography variant="h6" color="textSecondary">
            No apps available
          </Typography>
        </Box>
      )}
    </GalleryContainer>
  );
}
