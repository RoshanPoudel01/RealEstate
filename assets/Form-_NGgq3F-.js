import{c as B,u as N,r as i,e as T,j as e,h as w,F as L,P as C,J,S as O,i as n,B as U}from"./index-Dql9ZPjC.js";import{R as _}from"./index-DE1ZsJR8.js";import{u as y}from"./useGetErrors-Bhs_yQR9.js";import{b as W,c as z,d as H}from"./service-gallery-Bqqm13Ot.js";import{t as M}from"./index-B-l80DhA.js";import"./index-BupwMUFt.js";import"./Trash-CmVCt38o.js";const $=()=>{const{id:l}=B(),E={title_en:"",title_np:"",description_en:"",description_np:"",image:"",images:[],display_order:""},p=N(),[h,j]=i.useState(!1),[m,S]=i.useState([]),[k,c]=i.useState([]),{control:t,handleSubmit:F,reset:g}=T({defaultValues:E}),{data:a,isLoading:v}=W(l);i.useEffect(()=>{a&&(g({title_en:a.data.title_en,title_np:a.data.title_np,description_en:a.data.description_en,description_np:a.data.description_np,display_order:a.data.display_order,image:a.data.image,images:a.data.images.map(s=>s.image)}),c(a.data.images.map(s=>({id:s.id,url:s.image}))))},[a,g]);const{mutateAsync:D,isPending:G,isError:u,error:f}=z(),{mutateAsync:I,isPending:A,isError:x,error:b}=H(),[r,d]=i.useState({});i.useEffect(()=>{d(u?y(f):x?y(b):{})},[f,b,u,x]);const P=async s=>{const o=M(s);m.length&&o.append("delete_images",JSON.stringify(m)),h&&o.append("remove_image","1"),l?(await I({id:l,data:o})).data.status&&p("/admin/gallery"):(await D({data:o})).data.status&&p("/admin/gallery")};return v?e.jsx(w,{}):e.jsxs(L,{flexDir:"column",gap:4,children:[e.jsx(C,{heading:"Gallery Form",description:"Add or Edit Gallery"}),e.jsx(J,{gap:4,asChild:!0,children:e.jsxs("form",{id:"gallery-form",onSubmit:F(P),children:[e.jsxs(O,{columns:{base:1,md:2},gap:4,children:[e.jsx(n,{control:t,label:"Title (English)",name:"title_en",backendError:r.title_en}),e.jsx(n,{control:t,label:"Title (Nepali)",name:"title_np",backendError:r.title_np}),e.jsx(n,{control:t,label:"Description (English)",name:"description_en",type:"textarea",backendError:r.description_en}),e.jsx(n,{control:t,label:"Description (Nepali)",name:"description_np",type:"textarea",backendError:r.description_np}),e.jsx(n,{control:t,label:"Display Order",name:"display_order",backendError:r.display_order,type:"number"})]}),e.jsx(_,{control:t,name:"image",label:"Thumbnail",backendError:r.image,options:{accept:{"image/*":[]}},file:(a==null?void 0:a.data.image)??"",boxWidth:"250px",boxAspectRatio:16/9,setRemoveImage:j}),e.jsx(_,{control:t,name:"images",label:"Images",backendError:r.image,options:{accept:{"image/*":[]}},isMultiple:!0,w:"full",boxWidth:"250px",boxAspectRatio:16/9,prevFiles:k,setPrevFiles:c,setDeleteImages:S}),e.jsx(U,{type:"submit",form:"gallery-form",loading:G||A,children:"Save"})]})})]})};export{$ as default};