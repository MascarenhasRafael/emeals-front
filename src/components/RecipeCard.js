import * as React from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';

import recipeDefaultImage from '../assets/recipeDefaultImage.png'
import RecipeDetail from './RecipeDetail';

export default function RecipeCard({ recipe, remove, downloadPath }) {
  const { image_path, name, id } = recipe
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 360 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={image_path || recipeDefaultImage}
        alt='recipe image'
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ height: 50 }}>
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container sx={{ padding: 1 }}>
          <Grid item xs={7} sm={8} md={7} lg={7}>
            <a download href={downloadPath} rel='noreferrer' target='_blank'>
              <IconButton aria-label="download" color="success" alt='Save as JSON-LD'>
                <CloudDownloadIcon fontSize="small" />
              </IconButton>
            </a>
            <Link to={`/edit/${id}`} style={{ textDecoration: 'none' }}>
              <IconButton aria-label="edit" color="primary" alt='Save as JSON-LD'>
                <EditIcon fontSize="small" />
              </IconButton>
            </Link>
            <IconButton onClick={remove} aria-label="delete" color="error" alt='Save as JSON-LD'>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Grid>

          <Grid item xs={5} sm={4} md={5} lg={5}>
            <Button onClick={openModal} variant="contained" size="medium">Details</Button>
          </Grid>
        </Grid>
      </CardActions>
      <RecipeDetail id={id} opened={modalOpen} close={closeModal} />
    </Card>
  );
}