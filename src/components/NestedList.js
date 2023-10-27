import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function NestedList({ title, titleIcon, items, itemType }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const itemPresenter = element => {
    if (itemType === 'ingredients') {
      return `${element.item}, ${element.quantity} ${element.measurement_unit}`
    }
    return element.content
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {titleIcon}
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item, index) => (
            <ListItemButton sx={{ pl: 4 }} key={index}>
              <ListItemIcon>
                <ArrowRightIcon fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary={itemPresenter(item)} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}