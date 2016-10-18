
<div class="container">
  <h2>Methods</h2>
  <p>Methods selected:</p>
  <div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>METHOD</th>
        
        <th>PACKAGE</th>
       
        <th>PARAMS</th>
      </tr>
    </thead>
    <tbody>
    {#.}
      <tr>
        <td STYLE='FONT-SIZE:14PX;'>{.DURATION} ms</td>
        <td>{.METHOD}<br /> <span STYLE='FONT-SIZE:9PX;'>{.DATE}<br/> </span></td>       
        <td STYLE='FONT-SIZE:9PX;'>{.PACKAGE} <span STYLE='FONT-SIZE:9PX;'>{.ID}<br/> </span></td>       
     
        <td>
       
       
         <table class="table" STYLE='FONT-SIZE:9PX;'>
            <thead>
                <tr>
                    <th>key</th>
                    <th>value</th>
                    
                </tr>
            </thead>
            <tbody>
             {#ATTRIBUTES} 
                <tr>
                    <td style='font-weight:bold;'>{.key}</td>
                    <td>{.value}</td>
                </tr>
                {/ATTRIBUTES}
            </tbody>
         </table>
        </td>
      </tr>
      {/.}
    </tbody>
  </table>
  </div>
</div>