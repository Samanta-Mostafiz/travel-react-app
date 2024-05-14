import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports🛂", quantity: 2, packed: false },
    { id: 2, description: "sunglasses🕶️", quantity: 12, packed: false },
    { id: 3, description: "charger📴", quantity: 5, packed: false },
  ];

export default function App(){
    const[units,setUnit]=useState(initialItems);

    function handleAddUnit(unit){
        setUnit((units)=>[...units,unit]);
    }
    function handleDeleteItems(id){
        setUnit((units)=>units.filter((unit)=>unit.id!==id));
    }
    function handleToggleItems(id){
setUnit(units=>units.map(unit=>unit.id===id?{...unit,packed:!unit.id}:unit));
    }

//  component gula sob ekhane render kora
return(
<div className="app">
    <Logo/>
    <Form onAddUnits={handleAddUnit}/>
    <Lists units={units} 
    onDeleteItem={handleDeleteItems}
    onToggleItem={handleToggleItems}/>  {/* je function component new create korsi segulake evabe prop hisabe child component e render korte hoi */}
    <Stats units={units}/>
     </div>
);
}

// jsx components\\
function Logo(){
    return(
        <div>
            <h1>🌻Far Away💦</h1>
        </div>
    );
}
function Form(onAddUnits){
    const [description,setDescription]=useState("");
    const[quantity,setQuantity]=useState(1);

    function handleSubmit(e){
        e.preventdefault();////// page refresh hobena,single dynamic page\\\\\\\\\
       if(!description)return;
   const newUnit={description,quantity,packed:true,id: Date.now()};
   console.log(newUnit);
   onAddUnits(newUnit);
   setDescription("");
   setQuantity(1);
   }
    /// new item add korle form e list e render hobena, sudhu console krbe,list e state re render krte hole  main je common parent component sekhane derive korte hobe child prop create kore\\\
    return(
        <form className="add-form" onSubmit={handleSubmit} >
            <h3>what is needed for the trip?🤠</h3>
            <select
            value={quantity}
            onChange={(e)=>setQuantity(e.target.value)}>
            {Array.from({length:20},(_,i)=>i+1).map((num)=>(
                <option value={num} key={num}>
                    {num}
                </option>
            ))}

            </select>
            <input type="text" 
            placeholder="item name"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}/>
            <button>Add</button>
        </form>
    );
}
function  Lists({units,onDeleteItem})
{
    return (
            
        <div className="list">
            <ul>
            {units.map(item=><Items item={item} onDeleteItem={onDeleteItem} onToggleItem key={units.id} />)}
            </ul>
        </div>
    );
}
// child prop for Items component
function Items({item,onDeleteItem,onToggleItem}){
    return(
<span style={item.packed?{textDecoration:"Line-through"}:{}}>
    <li>
        <input type="checkbox" value={item.packed} onChange={()=>(onToggleItem(item.id))}/>
        {item.quantity} {item.description}
        <button onClick={()=>onDeleteItem(item.id)}>❎</button>     
    </li>
</span>
   );
}
function Stats({units}){
    const numItems=units.length;
    return(
        <footer className="stats">
<em>you have{numItems} X items on your list and already packed X(%X)</em>
        </footer>
    );
} 