import{r as f,j as e,D as y,P as S,T as o,b$ as u}from"./index-Mfjc3LbF.js";import{u as w,S as K}from"./useSearchParamState-C-salS8K.js";import{b as P}from"./service-enquiries-DHuqGoaN.js";const E=()=>{var i,c,l,d,h;const{pageIndex:s,setPageIndex:x,keyword:n,setKeyword:p}=w(),m=[{header:"S.No.",accessorKey:"s.no",cell:({row:r})=>e.jsx(o,{children:(s-1)*10+r.index+1})},{header:"Name",accessorKey:"name",cell:({row:r})=>e.jsx(o,{children:r.original.name})},{header:"Email",accessorKey:"email",cell:({row:r})=>{const{email:t}=r.original;return e.jsx(o,{_hover:{color:"primary.500",textDecoration:"underline"},asChild:!0,children:e.jsx(u,{to:`mailto:${t}`,children:t})})}},{header:"Phone",accessorKey:"phone",cell:({row:r})=>{const{phone:t}=r.original;return e.jsx(o,{_hover:{color:"primary.500",textDecoration:"underline"},asChild:!0,children:e.jsx(u,{to:`tel:${t}`,children:t})})}},{header:"Question",accessorKey:"question",cell:({row:r})=>{const{question:t}=r.original;return e.jsx(o,{mx:"auto",maxW:"500px",wordBreak:"break-word",children:t})}}],{data:a,isLoading:g,refetch:j}=P({page:s,keyword:n});return f.useEffect(()=>{j()},[s,n]),e.jsxs(y,{isLoading:g,columns:m,data:((i=a==null?void 0:a.data)==null?void 0:i.rows)??[],pagination:{manual:!0,pageCount:((l=(c=a==null?void 0:a.data)==null?void 0:c.pagination)==null?void 0:l.last_page)??1,totalRows:((h=(d=a==null?void 0:a.data)==null?void 0:d.pagination)==null?void 0:h.total)??0,pageParams:{pageIndex:s,setPageIndex:x}},children:[e.jsx(S,{heading:"Messages",description:"List of all the messages from the users."}),e.jsx(K,{placeholder:"Search",maxW:"300px",value:n,onSearch:p})]})};export{E as default};
