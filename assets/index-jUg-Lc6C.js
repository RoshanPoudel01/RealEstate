import{u as U,bl as X,b as Y,r as l,bm as Z,bn as L,j as e,F as g,P as ee,H as R,bo as te,bp as re,bq as se,ad as _,ag as ae,ah as ie,br as oe,bs as ne,bt as le,bu as de,bv as j,bw as ce,bx as pe,by as u,ac as ue,bz as xe,B as he}from"./index-CoRq1SEl.js";import{c as me,e as fe,o as ge}from"./index.esm-DeNjg6l_.js";import{I}from"./XCircle-A1fTDxSX.js";import{u as je,S as be}from"./useSearchParamState-CcOC1ang.js";import{P as Se,a as Pe,C as Ce}from"./progress-DSpR84S0.js";import{u as we}from"./useGetErrors-Bhs_yQR9.js";import{e as Fe}from"./service-category-B8gsAm-O.js";const ve=["S.N","Property Name","Action"],ye=me().shape({properties:fe().min(1,"Select at least one property.")}),_e=()=>{var y,A,E,T,k,N;const W={properties:[]},H=U(),{keyword:b,setKeyword:z}=je(),{mutateAsync:V,isPending:$,isError:S,error:P}=X(),{setValue:c,handleSubmit:q,reset:D,formState:C}=Y({defaultValues:W,resolver:ge(ye)}),{data:x}=Fe(),[h,G]=l.useState(null),[p,m]=l.useState([]),[f,J]=l.useState({}),{data:a,isFetching:w,isPending:F,refetch:v}=Z({categoryId:h,keyword:b});l.useEffect(()=>{v()},[h,b,v]);const{data:i}=L();l.useEffect(()=>{i!=null&&i.data&&m(i==null?void 0:i.data.rows.map(t=>({id:t.id,title_en:t.title_en})))},[i==null?void 0:i.data,D]),l.useEffect(()=>{S&&J(we(P))},[S,P]);const K=(t,r)=>{m(o=>{var d,B;if(r){const n=(B=(d=a==null?void 0:a.data)==null?void 0:d.rows)==null?void 0:B.find(s=>s.id===t);if(n&&!o.some(s=>s.id===n.id)){const s=[...o,{id:n.id,title_en:n.title_en}];return c("properties",s.map(Q=>Q.id.toString())),s}}else{const n=o.filter(s=>s.id!==t);return c("properties",n.map(s=>s.id.toString())),n}return o})},O=t=>{m(r=>{const o=r.filter(d=>d.id!==t);return c("properties",o.map(d=>d.id.toString())),o})};l.useEffect(()=>{c("properties",p.map(t=>t.id.toString()))},[p,c]);const M=async t=>{(await V({data:{properties:JSON.stringify(t.properties)}})).data.status&&H("/admin/properties/featured")};return e.jsx(g,{direction:"column",gap:8,asChild:!0,children:e.jsxs("form",{onSubmit:q(M),id:"new-arrival-form",noValidate:!0,children:[e.jsx(ee,{heading:"Featured",description:"Select properties to add as featured"}),e.jsxs(R,{align:"center",gap:2,w:"full",flexWrap:{base:"wrap",sm:"nowrap"},justify:"space-between",children:[e.jsx(be,{placeholder:"Search property",onSearch:t=>z(t),maxW:{base:"full",sm:"300px"},w:"full"}),e.jsx(te,{size:"lg",maxW:{base:"full",sm:"300px"},children:e.jsxs(re,{value:h??"",onChange:t=>{const r=t.currentTarget.value;G(r)},children:[e.jsx("option",{value:"",disabled:!0,children:"Select Category"}),(A=(y=x==null?void 0:x.data)==null?void 0:y.rows)==null?void 0:A.map(t=>e.jsx("option",{value:t.id,children:t.name_en},t.id))]})})]}),F||w?e.jsx(g,{height:"10dvh",w:"full",justify:"center",align:"center",children:e.jsx(Se,{colorPalette:"primary",w:"full",maxW:"240px",value:null,children:e.jsx(Pe,{})})}):((E=a==null?void 0:a.data)==null?void 0:E.count)??!1?e.jsx(R,{flexWrap:"wrap",gap:4,children:(k=(T=a==null?void 0:a.data)==null?void 0:T.rows)==null?void 0:k.map(t=>e.jsx(Ce,{maxW:"200px",name:"properties",colorPalette:"primary",label:t.title_en,checked:p.some(r=>r.id===t.id),onCheckedChange:r=>{K(t.id,r.checked)}},t.id))}):e.jsx(se,{icon:e.jsx(_,{asChild:!0,boxSize:16,children:e.jsx(I,{})}),title:"No properties found",description:"Select a category to list properties."}),(!F||!w)&&e.jsxs(ae,{children:[e.jsx(ie,{children:e.jsx(oe,{children:e.jsxs(ne,{captionSide:"top",children:[((N=C.errors)==null?void 0:N.properties)&&e.jsx(le,{color:"red.500",children:(f==null?void 0:f.properties)??C.errors.properties.message}),e.jsx(de,{children:e.jsx(j,{children:ve.map(t=>e.jsx(ce,{textAlign:"center",children:t},t))})}),e.jsx(pe,{children:p.length>0?p.map((t,r)=>e.jsxs(j,{textAlign:"center",children:[e.jsx(u,{textAlign:"center",children:r+1}),e.jsx(u,{textAlign:"center",children:t.title_en}),e.jsx(u,{textAlign:"center",children:e.jsx(ue,{onClick:()=>{O(t.id)},variant:"surface",colorPalette:"red",children:e.jsx(_,{asChild:!0,boxSize:6,children:e.jsx(I,{})})})})]},t.id)):e.jsx(j,{children:e.jsx(u,{py:10,colSpan:3,textAlign:"center",children:"No properties selected"})})})]})})}),e.jsx(xe,{children:e.jsx(g,{flexDir:"column",gap:4,w:"full",children:e.jsx(he,{loading:$,loadingText:"Adding...",colorScheme:"primary",type:"submit",form:"new-arrival-form",children:"Submit"})})})]})]})})};export{_e as default};