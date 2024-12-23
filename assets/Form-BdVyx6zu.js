import{a as w,p as R,r as m,u as A,b as U,q as B,s as C,j as e,c as L,F as $,S as G,P as H,d as s,H as O,B as q,t as z}from"./index-BVyWgP0Q.js";import{o as V}from"./yup-DXyx5UIZ.js";import{R as J}from"./index-CbALRGXo.js";import{S as K}from"./index-BorBKyUm.js";import{u as M}from"./useGetDirtyData-Dc4_-Xhu.js";import{u as E}from"./useGetErrors-Bhs_yQR9.js";import{c as Q,a as t,b as W,d as X}from"./index.esm-DXGjF0Z-.js";import"./index-jbnGfxiJ.js";import"./Trash-0YmnJkgT.js";const Y=Q().shape({name_en:t().required("Name is required"),name_np:t().required("Name is required"),description_en:t().required("Description is required"),description_np:t().required("Description is required"),position_en:t().required("Position is required"),position_np:t().required("Position is required"),image:W().required("Image is required"),facebook:t().url("Invalid URL"),instagram:t().url("Invalid URL"),twitter:t().url("Invalid URL"),is_active:t().required("Status is required"),display_order:X().required("Display Order is required").typeError("Display Order must be a number")}),de=()=>{var f;const o={name_en:"",name_np:"",description_en:"",description_np:"",position_en:"",position_np:"",image:"",facebook:"",instagram:"",twitter:"",is_active:"1",display_order:""},{id:n}=w(),{data:r,isPending:j,isFetching:k}=R(n);m.useEffect(()=>{r!=null&&r.data?d({...r==null?void 0:r.data,is_active:r!=null&&r.data.is_active?"1":"0"}):d(o)},[r]);const c=A(),{control:a,handleSubmit:v,reset:d,formState:y}=U({defaultValues:o,resolver:V(Y)}),{mutateAsync:h,isPending:S,isError:p,error:l}=B(),{mutateAsync:P,isPending:D,isError:b,error:g}=C(),[i,_]=m.useState({}),[I,N]=m.useState(!1);m.useEffect(()=>{p?_(E(l)):b&&_(E(g))},[p,l,b,g]);const T=async x=>{const u=z(n?M(y,x):x);I&&u.append("remove_image","1"),n?(await P({data:u,id:n})).data.status&&(d(o),c("/admin/teams")):(await h({data:u})).data.status&&(d(o),c("/admin/teams"))};return e.jsx(e.Fragment,{children:n&&(j||k)?e.jsx(L,{}):e.jsxs($,{flexDir:"column",gap:8,children:[e.jsx(G,{alignItems:"start",columns:{base:1,md:2},gap:4,asChild:!0,children:e.jsxs("form",{id:"team-form",onSubmit:v(T),noValidate:!0,children:[e.jsx(H,{heading:"Add Team",description:"Add new team"}),e.jsx(s,{control:a,required:!0,backendError:i.name_en,name:"name_en",label:"Name (EN)"}),e.jsx(s,{control:a,required:!0,backendError:i.name_np,name:"name_np",label:"Name (NP)"}),e.jsx(s,{control:a,required:!0,backendError:i.description_en,name:"description_en",label:"Description (EN)",type:"textarea"}),e.jsx(s,{control:a,required:!0,backendError:i.description_np,name:"description_np",label:"Description (NP)",type:"textarea"}),e.jsx(s,{control:a,required:!0,backendError:i.position_en,name:"position_en",label:"Position (EN)"}),e.jsx(s,{control:a,required:!0,backendError:i.position_np,name:"position_np",label:"Position (NP)"}),e.jsx(s,{control:a,backendError:i.facebook,name:"facebook",label:"Facebook"}),e.jsx(s,{control:a,backendError:i.instagram,name:"instagram",label:"Instagram"}),e.jsx(s,{control:a,backendError:i.twitter,name:"twitter",label:"Twitter"}),e.jsx(s,{control:a,required:!0,backendError:i.display_order,name:"display_order",label:"Display Order",type:"number"}),e.jsx(K,{control:a,required:!0,name:"is_active",label:"Status",options:[{label:"Active",value:"1"},{label:"Inactive",value:"0"}]}),e.jsx(J,{control:a,required:!0,backendError:i.image,name:"image",label:"Image",options:{accept:{"image/*":[]},maxSize:5},file:((f=r==null?void 0:r.data)==null?void 0:f.image)??"",setRemoveImage:N})]})}),e.jsxs(O,{align:"center",children:[e.jsx(q,{onClick:()=>c(-1),variant:"outline",children:"Cancel"}),e.jsx(q,{form:"team-form",loading:S||D,type:"submit",children:"Submit"})]})]})})};export{de as default};
