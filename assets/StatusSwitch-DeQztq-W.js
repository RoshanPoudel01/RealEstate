import{j as c,ak as i,g as o,al as s}from"./index-CoRq1SEl.js";const l=({model:t,id:a,invalidates:e})=>o({url:`/admin/toggle-status/${t}/${a}`,invalidates:e??[`${t}s`],enabled:!!a,method:"POST",queryKey:[`${t}s`],message:"Status updated successfully."}),S=({isActive:t,rowId:a,model:e,...n})=>{const{mutateAsync:r}=l({id:a,model:e}),u=async()=>{try{a!==null?await r({id:String(a),data:{is_active:!t}}):s("Something went wrong")}catch{s("Something went wrong")}};return c.jsx(i,{colorPalette:"primary",checked:t,onCheckedChange:u,...n})};export{S};
