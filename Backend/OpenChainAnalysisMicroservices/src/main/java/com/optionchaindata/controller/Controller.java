package com.optionchaindata.controller;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class Controller {
	
	@GetMapping("/test")
	public String test() {
		return "test successfull";
	}
	
	
	@GetMapping("/getNiftyData")
	public String getNiftyData()  {
		
		String inline = "";
		String readLine = null;
		StringBuffer response = new StringBuffer();
		String result="";
		 String jsonResponse = null;
		
		try {
			
			String _url="https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY";
			
			
			URL url=new URL(_url);
			
			HttpURLConnection connection = (HttpURLConnection)url.openConnection();
			
			connection.setRequestMethod("GET");
			connection.setRequestProperty("accept-encoding", "UTF-8");
			connection.setRequestProperty("accept-language", "en-US;");
			connection.setRequestProperty("user-agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36");	
			connection.setRequestProperty("cookie", "2D6C4CB3BECE00814C2C833C2B19F8FD~YAAQDsQsMaSnHEGDAQAAvIeRaxEE4W3bD1nTGVtvKnQNzlcw5t3KrCvEZhvKxTlqgr0yNyhjk1qf9vdbtMOpjl/l93yLMQxs5ibSX6MTvTzYPvnba0Ak75Cmp6Zuw+gYVG2TiQ7v+IXIDbQGFpSjlspiVEYApP/XcBrxjEDSUlrLR19vvhAtEFsuHvjFghsjPFU1tMEMUCI46u2Ak5NUCwk14HYERUNKA3081UGFfWooBY4fBZXf7vpRZk+B9PQSs6I=~1");
			connection.setRequestProperty("content-type", "application/json;");
			connection.connect();
			
			int responsecode = connection.getResponseCode();
			
			System.out.println("Response code is: " +responsecode);
			
			if (responsecode == HttpURLConnection.HTTP_OK) {
		        BufferedReader in = new BufferedReader(
		            new InputStreamReader(connection.getInputStream()));
		        
		        while ((readLine = in .readLine()) != null) {
//		        	System.out.println(readLine);
		            response.append(readLine);
		        } in .close();
		        // print result
		        System.out.println("JSON String Result ");
		        //GetAndPost.POSTRequest(response.toString());
		    } else {
		        System.out.println("GET NOT WORKED");
		    }
			
			
		}catch(Exception e) {
			
		}
		
		
		
		
		
		return response.toString();
	}
	
	@GetMapping("/getBankNiftyData")
	public String getBankNiftyData()  {
		
		String inline = "";
		String readLine = null;
		StringBuffer response = new StringBuffer();
		String result="";
		 String jsonResponse = null;
		
		try {
			
			String _url="https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY";
			
			
			URL url=new URL(_url);
			
			HttpURLConnection connection = (HttpURLConnection)url.openConnection();
			
			connection.setRequestMethod("GET");
			connection.setRequestProperty("accept-encoding", "UTF-8");
			connection.setRequestProperty("accept-language", "en-US;");
			connection.setRequestProperty("user-agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36");	
			connection.setRequestProperty("cookie", "2D6C4CB3BECE00814C2C833C2B19F8FD~YAAQDsQsMaSnHEGDAQAAvIeRaxEE4W3bD1nTGVtvKnQNzlcw5t3KrCvEZhvKxTlqgr0yNyhjk1qf9vdbtMOpjl/l93yLMQxs5ibSX6MTvTzYPvnba0Ak75Cmp6Zuw+gYVG2TiQ7v+IXIDbQGFpSjlspiVEYApP/XcBrxjEDSUlrLR19vvhAtEFsuHvjFghsjPFU1tMEMUCI46u2Ak5NUCwk14HYERUNKA3081UGFfWooBY4fBZXf7vpRZk+B9PQSs6I=~1");
			connection.setRequestProperty("content-type", "application/json;");
			connection.connect();
			
			int responsecode = connection.getResponseCode();
			
			System.out.println("Response code is: " +responsecode);
			
			if (responsecode == HttpURLConnection.HTTP_OK) {
		        BufferedReader in = new BufferedReader(
		            new InputStreamReader(connection.getInputStream()));
		        
		        while ((readLine = in .readLine()) != null) {
//		        	System.out.println(readLine);
		            response.append(readLine);
		        } in .close();
		        // print result
		        System.out.println("JSON String Result ");
		        //GetAndPost.POSTRequest(response.toString());
		    } else {
		        System.out.println("GET NOT WORKED");
		    }
			
			
		}catch(Exception e) {
			
		}
		
		
		
		
		
		return response.toString();
	}
	
	
	
}
