--------------------------------------------------------
--  File created - Saturday-February-20-2016   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Package XPLUG_SRCV
--------------------------------------------------------

  CREATE OR REPLACE PACKAGE "WSXPLUG"."XPLUG_SRCV" AS 

  procedure view_source( p_owner  IN  all_source.owner%TYPE,
                         p_name   IN  all_source.name%TYPE,
                         p_type   IN  all_source.type%TYPE := 'PACKAGE BODY');

                                                  
END XPLUG_SRCV;

/
