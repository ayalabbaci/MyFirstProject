import logo from './logo.png'
import ph1 from './ph1.jpg'
import ph2 from './ph2.jpg'
import ph3 from './ph3.jpg'
import ph4 from './ph4.jpg'
import ph5 from './ph5.jpg'
import ph6 from './ph6.jpg'
import ph7 from './ph7.jpg'
import ph8 from './ph8.jpg'
import ph9 from './ph9.jpg'
import ph10 from './ph10.jpg'
import ph11 from './ph1.jpg'
import content from './content.jpg'
import menu from './menu.jpg'
import algeriansoda from './algeriansoda.png'
import canette from './canette.png'
import grenade_jus from './grenade_jus.png'
import hamoud from './hamoud.jpg'
import jus from './jus.jpeg'
import selecto from './selecto.png'
import cheesepizza from './cheesepizza.png'
import cheesepizza2 from './cheesepizza2.png'
import hotdog1 from './hotdog1.png'
import hotdog2 from './hotdog2.png'
import hotdog3 from './hotdog3.png'
import italienpizza from './italienpizza.png'
import italienpizza2 from './italienpizza2.png'
import mashroum1 from './mashroum1.png'
import mashroum2 from './mashroum2.png'
import mashroum3 from './mashroum3.png'
import olives1 from './olives_pizza1.png'
import olives2 from './olivespizza2.png'
import olives3 from './olivespizza3.png'
import thonpizza from './thonpizza.png'
import thonpizza2 from './thonpizza3.png'
import tomatopizza from './tomatopizza.png'
import orange from './orange_jus.jpg'
import rating_starts from './rating_starts.png'
import add_icon_white from './add_icon_white.png'
import parcel_icon from './parcel_icon.png'
import add_icon from './add_icon.png'
import order_icon from './order_icon.png'
import profile_icon from './profile_icon.png'
import remove_icon_red from './remove_icon_red.png'
import add_icon_green from './add_icon_green.png'
import facebook from './facebook_icon.png'
import instagram from './instagram.png'
import twitter from './twitter_icon.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import cross_icon from './cross_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'

export const assets= {
logo,
ph1,
ph2,
ph3,
ph4,
ph5,
ph6,
ph7,
ph8,
ph9,
ph10,
ph11,
content,
menu,
algeriansoda,
canette,
grenade_jus,
hamoud,
jus,
selecto,
cheesepizza,
cheesepizza2,
hotdog1,
hotdog2,
hotdog3,
italienpizza,
italienpizza2,
mashroum1,
mashroum2,
mashroum3,
olives1,
olives2,
olives3,
thonpizza,
thonpizza2,
tomatopizza,
orange,
rating_starts,
add_icon_white,
parcel_icon,
add_icon,
order_icon,
profile_icon,
remove_icon_red ,
add_icon_green,
facebook,
instagram,
twitter,
app_store,
play_store,
cross_icon,
bag_icon,
logout_icon


}
export const menuliste = [
   { menu_name:"cheezz pizza",
    menu_image:ph1
   }
,
   { menu_name:"italiano pizza",
    menu_image:ph2
   },
   { menu_name:"tomato pizza",
    menu_image:ph3
   },
   { menu_name:"pizza with olives",
    menu_image:ph4
   },
   { menu_name:"pizza mushrooms",
    menu_image:ph5
   },
   { menu_name:"pizza hotdog",
    menu_image:ph6
   },
   { menu_name:"pizza chicken",
    menu_image:ph7
   },
   { menu_name:"pizza with fish",
    menu_image:ph8
   }
,
   { menu_name:"pizza camomber",
    menu_image:ph9
   },
   { menu_name:"pizza with egg",
    menu_image:ph10
   },
   { menu_name:"pizza with meat",
    menu_image:ph11
   },
   {menu_name:"jus",
      menu_image:jus
   },
   { menu_name:"canette",
      menu_image:canette
   },
   {menu_name:"algeriansoda",
      menu_image:algeriansoda
   }
]
export const food_list = [
   {
         _id: "1",
         name: "Cheese Pizza",
         image: cheesepizza,
         price: 450,
         description: " A classic cheese pizza with mozzarella cheese and tomato sauce.",
         category: "cheezz pizza",
   },

   {
         _id: "2",
         name: "Italian Pizza",
         image: italienpizza,
         price: 600,
         description: "A delicious Italian pizza with fresh ingredients.",
         category: "italiano pizza",
      },
   
      {
         _id: "3",
         name: "Tomato Pizza",
         image: tomatopizza,
         price: "500",
         description: "A simple tomato pizza with fresh tomatoes and herbs.",
         category: "tomato pizza",
      },
   
      {
         _id: "4",
         name: "Pizza with Olives",
         image: olives1,
         price: 200,
         description: "A savory pizza topped with olives and cheese.",
         category: "pizza with olives",
      },
   
      {
         _id: "5",
         name: "Pizza Mushrooms",
         image: mashroum1,
         price: 300,
         description: "A delicious pizza topped with mushrooms and cheese.",
         category: "pizza mushrooms",
      },
   
      {
         _id: "6",
         name: "Pizza Hotdog",
         image: hotdog1,
         price: 300,
         description: "A unique pizza topped with hotdogs and cheese.",
         category: "pizza hotdog",
      },
   
      {
      _id:"7",
      name:"Pizza Chicken",
      image:mashroum2,
      price:100,
      description:"A delicious pizza topped with chicken and cheese.",
      category:"pizza chicken"

  },
 {
      _id:"8",
      name:"orange juice",
      image:orange,
      price:500,
      description:"A refreshing orange juice.",
      category:"jus"

  },
  {
      _id:"9",
      name:"grenade juice",
      image:grenade_jus,
      price:300,
      description:"A refreshing grenade juice.",
      category:"jus"

  },
  {
      _id:"10",
      name:"hamoud",
      image:hamoud,
      price:200,
      description:"hamoud is a refreshing soda.",
      category:"algeriansoda"

  },
  {
    _id: "11",
    name: "selecto",
    image: selecto,
    price: 100,
    description: "selecto is a refreshing soda.",
    category: "algeriansoda",
 }
]
  export const url = 'http://localhost:5173'