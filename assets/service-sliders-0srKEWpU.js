import{e as l,f as s,g as r}from"./index-0ocjePm1.js";const a=({page:e=1,perPage:d=10,keyword:t=""})=>l({url:s.sliders.fetch({page:e,perPage:d,keyword:t}),queryKey:["sliders"]}),i=e=>l({url:s.sliders.fetchById.replace(":id",e),queryKey:[`slider-${e}`],enabled:!!e}),c=()=>r({url:s.sliders.create,queryKey:["create-slider"],invalidates:["sliders"],message:"Slider created successfully"}),y=()=>r({url:s.sliders.update,queryKey:["update-slider"],invalidates:["sliders"],method:"POST",message:"Slider updated successfully"}),n=()=>r({url:s.sliders.delete,queryKey:["delete-slider"],invalidates:["sliders"],method:"DELETE",message:"Slider deleted successfully"});export{n as a,i as b,c,y as d,a as u};