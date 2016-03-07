--------------------------------------------------------
--  File created - Saturday-February-20-2016   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Package Body XPLUG_SRCV
--------------------------------------------------------

  CREATE OR REPLACE PACKAGE BODY "WSXPLUG"."XPLUG_SRCV" AS

  TYPE t_rec_src_line is RECORD 
     (
       owner   all_source.owner%TYPE,
       name    all_source.name%TYPE,
       type    all_source.type%TYPE,
       line    all_source.line%TYPE,
       text    clob       
     );
     
  TYPE t_tab_src is table of t_rec_src_line index by pls_integer;
     

  procedure view_source( p_owner  IN  all_source.owner%TYPE,
                         p_name   IN  all_source.name%TYPE,
                         p_type   IN  all_source.type%TYPE := 'PACKAGE BODY') 
  is   
  ------------------------------------------------------------------------------
  -- 
  ------------------------------------------------------------------------------
  --
  --
  -- Declare variables
  --
  v_arr_src  t_tab_src;
  
  BEGIN  
    --
    -- Get PL/SQL source code
    --
    SELECT owner, name, type, line, text
      bulk collect  
      INTO v_arr_src
      FROM all_source
     WHERE owner = p_owner
       AND name  = p_name
       AND type  = p_type;
       
    --
    -- Exit early if no code found
    --
    IF v_arr_src.COUNT = 0 THEN
       RETURN;
    END IF;
    
    
    --
    -- Generate JSON
    --
    apex_json.initialize_clob_output;
    apex_json.open_object;
    apex_json.write( 'owner', v_arr_src(1).owner);
    apex_json.write( 'name',  v_arr_src(1).name);
    apex_json.write( 'type',  v_arr_src(1).type);
        
    apex_json.open_array('source');
    FOR v_idx IN v_arr_src.FIRST .. v_arr_src.LAST 
      LOOP
         apex_json.write(v_arr_src(v_idx).text);
      END LOOP; 
    apex_json.close_array;
    apex_json.close_object;    
        
    sys.dbms_output.put_line(apex_json.get_clob_output);        
        
    apex_json.free_output;          
  END view_source;

END XPLUG_SRCV;

/
