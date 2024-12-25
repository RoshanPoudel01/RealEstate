import{u as U,bL as X,e as Y,b2 as Z,r as d,by as L,bM as ee,j as e,F as g,P as te,H as I,bA as re,bB as se,ab as ae,am as R,aq as ie,ar as oe,bC as ne,bD as de,bE as le,bF as ce,bG as j,bH as pe,bI as ue,bJ as u,al as xe,bK as he,B as me}from"./index-Mfjc3LbF.js";import{o as fe}from"./yup-B6qiLbC7.js";import{I as _}from"./XCircle-BFHtgMID.js";import{u as ge,S as je}from"./useSearchParamState-C-salS8K.js";import{P as be,a as Se,C as Ce}from"./progress-BYKeaY3t.js";import{u as Pe}from"./useGetErrors-Bhs_yQR9.js";import{c as we,e as Te}from"./index.esm-BXtshgbH.js";const Ae=["S.N","Property Name","Action"],ye=we().shape({properties:Te().min(1,"Select at least one property.")}),Re=()=>{var y,v,E,F,k,B;const H={properties:[]},W=U(),{mutateAsync:z,isPending:V,isError:b,error:S}=X(),{setValue:c,handleSubmit:D,reset:G,formState:C}=Y({defaultValues:H,resolver:fe(ye)}),{data:x}=Z(),[h,J]=d.useState(null),{keyword:P,setKeyword:K}=ge(),[p,m]=d.useState([]),[f,$]=d.useState({}),{data:a,isFetching:w,isPending:T,refetch:A}=L({categoryId:h,keyword:P});d.useEffect(()=>{A()},[h,P,A]);const{data:i}=ee();d.useEffect(()=>{i!=null&&i.data&&m(i==null?void 0:i.data.rows.map(t=>({id:t.id,title_en:t.title_en})))},[i==null?void 0:i.data,G]),d.useEffect(()=>{b&&$(Pe(S))},[b,S]);const q=(t,r)=>{m(o=>{var l,N;if(r){const n=(N=(l=a==null?void 0:a.data)==null?void 0:l.rows)==null?void 0:N.find(s=>s.id===t);if(n&&!o.some(s=>s.id===n.id)){const s=[...o,{id:n.id,title_en:n.title_en}];return c("properties",s.map(Q=>Q.id.toString())),s}}else{const n=o.filter(s=>s.id!==t);return c("properties",n.map(s=>s.id.toString())),n}return o})},M=t=>{m(r=>{const o=r.filter(l=>l.id!==t);return c("properties",o.map(l=>l.id.toString())),o})};d.useEffect(()=>{c("properties",p.map(t=>t.id.toString()))},[p,c]);const O=async t=>{(await z({data:{properties:JSON.stringify(t.properties)}})).data.status&&W("/admin/properties/trending")};return e.jsx(g,{direction:"column",gap:8,asChild:!0,children:e.jsxs("form",{onSubmit:D(O),id:"new-arrival-form",noValidate:!0,children:[e.jsx(te,{heading:"Trending",description:"Select properties to add as trending"}),e.jsxs(I,{align:"center",gap:2,w:"full",flexWrap:{base:"wrap",sm:"nowrap"},justify:"space-between",children:[e.jsx(je,{placeholder:"Search property",onSearch:t=>K(t),maxW:{base:"full",sm:"300px"}}),e.jsx(re,{size:"lg",maxW:{base:"full",sm:"300px"},children:e.jsxs(se,{value:h??"",onChange:t=>{const r=t.currentTarget.value;J(r)},children:[e.jsx("option",{value:"",disabled:!0,children:"Select Category"}),(v=(y=x==null?void 0:x.data)==null?void 0:y.rows)==null?void 0:v.map(t=>e.jsx("option",{value:t.id,children:t.name_en},t.id))]})})]}),T||w?e.jsx(g,{height:"10dvh",w:"full",justify:"center",align:"center",children:e.jsx(be,{colorPalette:"primary",w:"full",maxW:"240px",value:null,children:e.jsx(Se,{})})}):((E=a==null?void 0:a.data)==null?void 0:E.count)??!1?e.jsx(I,{flexWrap:"wrap",gap:4,children:(k=(F=a==null?void 0:a.data)==null?void 0:F.rows)==null?void 0:k.map(t=>e.jsx(Ce,{maxW:"200px",name:"properties",colorPalette:"primary",label:t.title_en,checked:p.some(r=>r.id===t.id),onCheckedChange:r=>{q(t.id,r.checked)}},t.id))}):e.jsx(ae,{icon:e.jsx(R,{asChild:!0,boxSize:16,children:e.jsx(_,{})}),title:"No properties found",description:"Select a category to list properties."}),(!T||!w)&&e.jsxs(ie,{children:[e.jsx(oe,{children:e.jsx(ne,{children:e.jsxs(de,{captionSide:"top",children:[((B=C.errors)==null?void 0:B.properties)&&e.jsx(le,{color:"red.500",children:(f==null?void 0:f.properties)??C.errors.properties.message}),e.jsx(ce,{children:e.jsx(j,{children:Ae.map(t=>e.jsx(pe,{textAlign:"center",children:t},t))})}),e.jsx(ue,{children:p.length>0?p.map((t,r)=>e.jsxs(j,{textAlign:"center",children:[e.jsx(u,{textAlign:"center",children:r+1}),e.jsx(u,{textAlign:"center",children:t.title_en}),e.jsx(u,{textAlign:"center",children:e.jsx(xe,{onClick:()=>{M(t.id)},variant:"surface",colorPalette:"red",children:e.jsx(R,{asChild:!0,boxSize:6,children:e.jsx(_,{})})})})]},t.id)):e.jsx(j,{children:e.jsx(u,{py:10,colSpan:3,textAlign:"center",children:"No properties selected"})})})]})})}),e.jsx(he,{children:e.jsx(g,{flexDir:"column",gap:4,w:"full",children:e.jsx(me,{loading:V,loadingText:"Adding...",colorScheme:"primary",type:"submit",form:"new-arrival-form",children:"Submit"})})})]})]})})};export{Re as default};
