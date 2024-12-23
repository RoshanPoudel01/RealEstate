import{e as v,g as F,f as p,r as i,b as N,j as e,c as P,F as z,S as G,d as n,v as I,T as L,L as A,G as C,B as l,t as R}from"./index-CoRq1SEl.js";import{c as T,a as t,b as B,o as $}from"./index.esm-DeNjg6l_.js";import{R as M}from"./index-BdOjca5U.js";import{u as U}from"./useGetDirtyData-Dc4_-Xhu.js";import{u as V}from"./useGetErrors-Bhs_yQR9.js";import"./Trash-CaPAxoks.js";const w=()=>v({url:p.settings.fetch,queryKey:["settings"]}),K=()=>F({url:p.settings.update,method:"POST",invalidates:["settings"]}),Y=T().shape({name_en:t().required("Name is required"),name_np:t().required("Name is required"),phone_en:t().required("Phone is required"),phone_np:t().required("Phone is required"),address_en:t().required("Address is required"),address_np:t().required("Address is required"),description_en:t().required("Description is required"),description_np:t().required("Description is required"),email:t().email().required("Email is required"),facebook:t(),instagram:t(),youtube:t(),google_map:t(),logo:B()}),ae=()=>{const b={name_en:"",name_np:"",phone_en:"",phone_np:"",address_en:"",address_np:"",description_en:"",description_np:"",email:"",facebook:"",instagram:"",youtube:"",google_map:"",logo:""},[a,d]=i.useState(!1),{control:r,handleSubmit:g,reset:x,formState:_}=N({defaultValues:b,resolver:$(Y)}),[f,h]=i.useState(!1),{data:s,isPending:j,isFetching:q}=w(),{mutateAsync:y,isPending:E,isError:m,error:c}=K(),[o,k]=i.useState({});i.useEffect(()=>{m&&k(V(c))},[m,c]),i.useEffect(()=>{s!=null&&s.data&&x(s.data)},[s]);const S=async O=>{const D=U(_,O),u=R(D);f&&u.append("remove_image","true"),(await y({data:u})).data&&d(!1)};return j||q?e.jsx(P,{}):e.jsxs(z,{flexDir:"column",gap:4,children:[e.jsx(G,{alignItems:"start",columns:{base:1,md:2},gap:4,asChild:!0,children:e.jsxs("form",{id:"setting-form",onSubmit:g(S),noValidate:!0,children:[e.jsx(n,{control:r,backendError:o.name_en,required:a,readOnly:!a,name:"name_en",label:"Name (En)"}),e.jsx(n,{control:r,backendError:o.name_np,required:a,readOnly:!a,name:"name_np",label:"Name (Np)"}),e.jsx(n,{control:r,backendError:o.phone_en,required:a,readOnly:!a,name:"phone_en",label:"Phone (En)"}),e.jsx(n,{control:r,backendError:o.phone_np,required:a,readOnly:!a,name:"phone_np",label:"Phone (Np)"}),e.jsx(n,{control:r,backendError:o.address_en,required:a,readOnly:!a,name:"address_en",label:"Address (En)"}),e.jsx(n,{control:r,backendError:o.address_np,required:a,readOnly:!a,name:"address_np",label:"Address (Np)"}),e.jsx(n,{control:r,backendError:o.description_en,name:"description_en",label:"Description (En)",type:"textarea"}),e.jsx(n,{control:r,backendError:o.description_np,name:"description_np",label:"Description (Np)",type:"textarea"}),e.jsx(n,{control:r,required:a,readOnly:!a,name:"email",label:"Email"}),e.jsx(n,{control:r,readOnly:!a,name:"facebook",label:"Facebook"}),e.jsx(n,{control:r,readOnly:!a,name:"instagram",label:"Instagram"}),e.jsx(n,{control:r,readOnly:!a,name:"youtube",label:"Youtube"}),e.jsx(n,{control:r,readOnly:!a,name:"google_map",label:"Google Map"})]})}),a?e.jsx(M,{control:r,name:"logo",label:"Logo",options:{accept:{"image/*":[]},maxSize:5},file:(s==null?void 0:s.data.logo)??"",setRemoveImage:h}):e.jsxs(I,{children:[e.jsx(L,{children:"Logo"}),e.jsx(A,{src:(s==null?void 0:s.data.logo)??"",alt:s==null?void 0:s.data.name})]}),a?e.jsxs(C,{mt:4,children:[e.jsx(l,{variant:"outline",onClick:()=>d(!1),colorPalette:"gray",size:"sm",children:"Cancel"}),e.jsx(l,{form:"setting-form",type:"submit",loading:E,size:"sm",children:"Save"})]}):e.jsx(l,{onClick:()=>d(!0),size:"sm",children:"Edit"})]})};export{ae as default};
