import React from 'react';
import { GridList, GridTile, IconButton, Subheader} from 'material-ui';
import Navigatenext from 'material-ui/svg-icons/image/navigate-next';


const styles = {
  title : {
    color : "white",
  },
root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
  },
  gridtile : {
    height:200,
  }
}
const tilesData = [
  {
    img: '../../assets/images/unanswered.png',
    title: "Post Answer Here",
    comp : "unanswered"
  },
  {
    img: '../../assets/images/qanda.png',
    title: "All Questions",
    comp: "allquestions"
  },
  {
    img: '../../assets/images/allusers.png',
    title: "All Users",
    comp: "allusers"
  },
  {
    img: '../../assets/images/Robotics.jpg',
    title: "Add Questions",
    comp: "newquestions"
  }
]

export default class Home extends React.Component{

render()
{
  return(
    <div className = "container-fluid">

    <div style={styles.root}>
                <GridList
                  cellHeight={180}
                  style={styles.gridList}>
                  <Subheader style = {styles.title}>Navigate Here</Subheader>
                  {tilesData.map((tile) => (
                   <GridTile
                   style = {styles.gridtile}
                     key={tile.img}
                     title={tile.title}
                     onClick = {() => this.props.setComponent({comp : tile.comp})}
                     actionIcon={<IconButton><Navigatenext color="white" />
                                 </IconButton>}>
                   <img src={tile.img} className = "ïmagepoint responsive" alt = "icon"  />
                 </GridTile>
               ))}
                </GridList>
              </div>

    </div>
  );
}
}
