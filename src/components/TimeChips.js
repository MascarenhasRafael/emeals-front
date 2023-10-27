import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import prettyMilliseconds from 'pretty-ms';

import prepTimeIcon from '../assets/prepTimeIcon.png'
import cookTimeIcon from '../assets/cookTimeIcon.png'

const durationPresenter = seconds => seconds && prettyMilliseconds((seconds * 1000), { verbose: true })

export default function TimeChips({ prepTime, cookTime }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        avatar={<Avatar alt="preparation time" src={prepTimeIcon} />}
        label={durationPresenter(prepTime)}
        variant="outlined"
      />
      <Chip
        avatar={<Avatar alt="time" src={cookTimeIcon} />}
        label={durationPresenter(cookTime)}
        variant="outlined"
      />
    </Stack>
  );
}