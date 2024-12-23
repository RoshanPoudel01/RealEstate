import{u as A,b as B,a as $,R as f,r as b,j as r,c as w,F as G,P as H,S as O,d as s,H as U,B as x,t as z}from"./index-CoRq1SEl.js";import{c as V,a as n,b as L,d as T,o as J}from"./index.esm-DeNjg6l_.js";import{R as K}from"./index-BdOjca5U.js";import{S as M}from"./index-kUnOPZqm.js";import{u as Q}from"./useGetDirtyData-Dc4_-Xhu.js";import{u as E}from"./useGetErrors-Bhs_yQR9.js";import{b as W,c as X,d as Y}from"./service-category-B8gsAm-O.js";import"./Trash-CaPAxoks.js";const Z=V().shape({name_en:n().required("Name is required"),name_np:n().required("Name is required"),description_en:n().required("Description is required"),description_np:n().required("Description is required"),image:L().required("Image is required"),display_order:T().required("Display Order is required").typeError("Display Order must be a number"),is_active:n().required()}),oe=()=>{const d={name_en:"",name_np:"",description_en:"",description_np:"",image:"",display_order:"",is_active:"1"},m=A(),{control:t,handleSubmit:y,reset:o,formState:q}=B({defaultValues:d,resolver:J(Z)}),{id:a}=$(),{data:e,isPending:h,isFetching:j}=W(a),[D,S]=f.useState(!1);b.useEffect(()=>{o(a?{name_en:(e==null?void 0:e.data.name_en)??"",name_np:(e==null?void 0:e.data.name_np)??"",description_en:(e==null?void 0:e.data.description_en)??"",description_np:(e==null?void 0:e.data.description_np)??"",image:e==null?void 0:e.data.image,is_active:e!=null&&e.data.is_active?"1":"0",display_order:e==null?void 0:e.data.display_order}:d)},[a,e]);const{mutateAsync:C,isPending:k,isError:c,error:u}=X(),{mutateAsync:v,isPending:F,isError:l,error:_}=Y(),[i,g]=f.useState({});b.useEffect(()=>{c?g(E(u)):l&&g(E(_))},[c,u,l,_]);const P=async I=>{const N=Q(q,I),p=z(N);D&&p.append("remove_image","1"),a?(await v({data:p,id:a})).data.status&&(o(d),m("/admin/category")):(await C({data:p})).data.status&&(o(d),m("/admin/category"))};return a&&(h||j)?r.jsx(w,{}):r.jsxs(G,{flexDir:"column",gap:4,children:[r.jsx(H,{heading:a?"Edit Category":"Add Category",description:a?"Edit the category details":"Add the category details"}),r.jsx(O,{alignItems:"start",columns:{base:1,md:2},gap:4,asChild:!0,children:r.jsxs("form",{onSubmit:y(P),noValidate:!0,id:"category-form",children:[r.jsx(s,{control:t,required:!0,backendError:i.name_en,name:"name_en",label:"Name (En)"}),r.jsx(s,{control:t,required:!0,name:"name_np",label:"Name (Np)",backendError:i.name_np}),r.jsx(s,{control:t,required:!0,name:"description_en",label:"Description (En)",type:"textarea",backendError:i.description_en}),r.jsx(s,{control:t,required:!0,name:"description_np",label:"Description (Np)",type:"textarea",backendError:i.description_np}),r.jsx(s,{control:t,required:!0,name:"display_order",label:"Display Order",backendError:i.display_order,type:"number"}),r.jsx(M,{control:t,name:"is_active",label:"Status"}),r.jsx(K,{name:"image",control:t,required:!0,backendError:i.image,label:"Image",file:(e==null?void 0:e.data.image)??"",setRemoveImage:S,options:{accept:{"image/*":[]},maxSize:5},message:"Drop image here or click to upload"})]})}),r.jsxs(U,{mt:4,children:[r.jsx(x,{variant:"outline",colorPalette:"gray",onClick:()=>m(-1),children:"Back"}),r.jsx(x,{type:"submit",form:"category-form",colorPalette:"primary",color:"white",loading:k||F,children:"Submit"})]})]})};export{oe as default};
