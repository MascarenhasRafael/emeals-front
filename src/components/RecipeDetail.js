import React, { useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IconButton from '@mui/material/IconButton';

import { getRecipeById } from '../services/api';
import recipeDefaultImage from '../assets/recipeDefaultImage.png'
import NestedList from './NestedList';
import TimeChips from './TimeChips';

import { recipeDownloadPath } from '../services/api'
import { Stack } from '@mui/material';

const formatDate = date => date && format(new Date(date), 'MMMM d, yyyy')

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RecipeDetail({ id, opened, close }) {
  const [recipe, setRecipe] = React.useState({});

  const fetchRecipe = useCallback(async () => {
    const data = await getRecipeById(id);
    setRecipe(data);
  }, [id]);

  useEffect(() => {
    if (!opened) { return }

    fetchRecipe();
  }, [opened, fetchRecipe]);

  return (
    <div>
      <Modal
        open={opened}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ px: 20 }}
      >
        <Box sx={style}>
          <CardMedia
            component="img"
            alt="recipe image"
            height={200}
            image={recipe.image_path || recipeDefaultImage}
          />
          <CardContent>

            <Typography gutterBottom variant="h5" component="div">
              {recipe.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Updated on {formatDate(recipe.updated_at)}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <TimeChips
                  cookTime={recipe.cook_time_in_seconds}
                  prepTime={recipe.prep_time_in_seconds} />
                <a download href={recipeDownloadPath(recipe.id)} rel='noreferrer' target='_blank'>
                  <IconButton aria-label="download" color="success" alt='Save as JSON-LD'>
                    <CloudDownloadIcon fontSize="medium" />
                  </IconButton>
                </a>
              </Stack>
            </Typography>

            <NestedList
              title='Ingredients'
              titleIcon={<KitchenOutlinedIcon />}
              items={recipe.ingredients || []}
              itemType='ingredients' />
            <NestedList
              title='Instructions'
              titleIcon={<MenuBookIcon />}
              items={recipe.instructions || []}
              itemType='instructions' />
          </CardContent>
          <CardActions>
            <Button onClick={close} size="medium" variant="contained">Close</Button>
          </CardActions>
        </Box>
      </Modal>
    </div>
  );
}