import{b$ as b,b as S,c0 as _,c1 as C,r as p,j as e,F as f,S as E,d as s,B as y,v as D,P as A,ag as H,c2 as R,c3 as T,aR as F,H as I,c4 as N,ad as w,c5 as B,c6 as O,ah as k}from"./index-CoRq1SEl.js";import{R as P}from"./index-BdOjca5U.js";import"./Trash-CaPAxoks.js";const{Axios:G,AxiosError:J,CanceledError:M,isCancel:U,CancelToken:q,VERSION:K,all:L,Cancel:Q,isAxiosError:W,spread:X,toFormData:$,AxiosHeaders:Y,HttpStatusCode:Z,formToJSON:ee,getAdapter:te,mergeConfig:ne}=b,c=({slug:a})=>{const i={id:"",title_en:"",title_np:"",description_en:"",description_np:"",image:"",caption_en:"",caption_np:""},{control:n,handleSubmit:r,reset:o}=S({defaultValues:i}),{data:t}=_(a),{mutateAsync:x,isPending:m}=C();p.useEffect(()=>{o(t?{id:t.data.id,title_en:t.data.title_en,title_np:t.data.title_np,description_en:t.data.description_en,description_np:t.data.description_np,image:t.data.image,caption_en:t.data.caption_en,caption_np:t.data.caption_np}:i)},[t,o]);const j=async d=>{console.log({data:d});const{id:h,...g}=d,u=$(g);await x({id:h,data:u})};return e.jsxs(f,{flexDir:"column",gap:4,children:[e.jsx(E,{columns:{base:1,md:2},gap:4,asChild:!0,children:e.jsxs("form",{id:`section-form-${a}`,onSubmit:r(j),children:[e.jsx(s,{name:"id",label:"ID",control:n,hidden:!0}),e.jsx(s,{name:"title_en",label:"Title (En)",control:n}),e.jsx(s,{name:"title_np",label:"Title (Np)",control:n}),e.jsx(s,{name:"description_en",label:"Description (En)",control:n,type:"textarea"}),e.jsx(s,{name:"description_np",label:"Description (Np)",control:n,type:"textarea"}),e.jsx(s,{name:"caption_en",label:"Caption (En)",control:n}),e.jsx(s,{name:"caption_np",label:"Caption (Np)",control:n}),(a==="hero-section"||a==="statistics-section"||a==="contact-section")&&e.jsx(P,{name:"image",label:"Image",control:n,options:{accept:{"image/*":["*.jpg","*.jpeg","*.png"]}},file:(t==null?void 0:t.data.image)??""})]})}),e.jsx(y,{form:`section-form-${a}`,loading:m,type:"submit",children:"Submit"})]})},l=({heading:a,defaultOpen:i,children:n})=>{const[r,o]=p.useState(i);return e.jsx(H,{children:e.jsxs(R,{open:r,onOpenChange:t=>o(t.open),defaultOpen:i,children:[e.jsx(T,{asChild:!0,children:e.jsx(F,{cursor:"pointer",py:4,borderBottom:"1px solid",borderColor:"gray.200",textAlign:"center",children:e.jsxs(I,{justify:"space-between",w:"full",children:[e.jsx(N,{children:a}),e.jsx(w,{asChild:!0,transform:r?"rotate(180deg)":"",transition:"transform .25s ease",boxSize:8,children:e.jsx(B,{})})]})})}),e.jsx(O,{children:e.jsx(k,{children:n})})]})})},ae=()=>e.jsxs(D,{gap:8,children:[e.jsx(A,{heading:"Sections",description:"Manage the sections of the website"}),e.jsx(l,{heading:"Hero Section",defaultOpen:!0,children:e.jsx(c,{slug:"hero-section"})}),e.jsx(l,{heading:"Statistics Section",children:e.jsx(c,{slug:"statistics-section"})}),e.jsx(l,{heading:"Contact Section",children:e.jsx(c,{slug:"contact-section"})})]});export{ae as default};