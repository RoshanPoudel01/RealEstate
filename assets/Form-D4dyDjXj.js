import{c as F,j as t,ab as y,u as k,c2 as D,r as a,e as P,c3 as B,h as I,F as R,P as q,S as N,i as o,B as T,t as w}from"./index-Dql9ZPjC.js";import{R as G}from"./index-DE1ZsJR8.js";import{u as L}from"./useGetErrors-Bhs_yQR9.js";import"./index-BupwMUFt.js";import"./Trash-CmVCt38o.js";const J=()=>{const{id:s}=F();if(!s)return t.jsx(y,{title:"No Statistics Found",description:"Please enter the valid statistics id"});const c={title_en:"",title_np:"",value:"",image:""},f=k(),{mutateAsync:g,isPending:x,isError:d,error:l}=D(),[i,n]=a.useState({});a.useEffect(()=>{n(d?L(l):{})},[d,l]);const{control:r,handleSubmit:E,reset:m}=P({defaultValues:c}),{data:e,refetch:h,isPending:b,isFetching:S}=B(s);a.useEffect(()=>{(async()=>{await h()})()},[s]);const[j,v]=a.useState(!1);a.useEffect(()=>{e&&m({title_en:e.data.title_en,title_np:e.data.title_np,value:e.data.value,image:e.data.image})},[e]);const _=async u=>{const p=w(u);j&&p.append("remove_image","true"),(await g({id:s,data:p})).data.status&&(n({}),m(c),f("/admin/statistics"))};return b||S?t.jsx(I,{}):t.jsxs(R,{flexDir:"column",gap:4,children:[t.jsx(q,{heading:"Edit Statistics",description:"Edit your statistics here"}),t.jsx(N,{columns:{base:1,md:2},gap:4,asChild:!0,children:t.jsxs("form",{id:"statistics-form",onSubmit:E(_),children:[t.jsx(o,{name:"title_en",label:"Title (English)",control:r,required:!0,backendError:i.title_en}),t.jsx(o,{name:"title_np",label:"Title (Nepali)",control:r,required:!0,backendError:i.title_np}),t.jsx(o,{name:"value",label:"Value",control:r,required:!0,backendError:i.value}),t.jsx(G,{name:"image",control:r,options:{accept:{"image/*":[]}},file:(e==null?void 0:e.data.image)??"",backendError:i.image,setRemoveImage:v})]})}),t.jsx(T,{type:"submit",form:"statistics-form",loading:x,children:"Submit"})]})};export{J as default};