import 'package:flutter/material.dart';
import 'DataModel.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

void main() {
  runApp(MaterialApp(
    home: Gps(),
    debugShowCheckedModeBanner: false,
  ));
}

class Gps extends StatefulWidget {
  @override
  State<Gps> createState() => _GpsState();
}

Future<http.Response> submitData(
    String terminalId, String latitude, String longitude) {

  Map<String, dynamic> body = {
    'terminalId': terminalId,
    'latitude': latitude,
    'longitude': longitude
  };

  return http.post(
      Uri.parse("http://10.0.2.2:8081/positions/position"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: json.encode(body));
}

class _GpsState extends State<Gps> {
  TextEditingController terminalIdController = TextEditingController();
  TextEditingController latitudeController = TextEditingController();
  TextEditingController longitudeController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.green,
        appBar: AppBar(
          title: Text("Gps Mobile Version"),
          centerTitle: true,
          backgroundColor: Colors.cyan,
        ),
        body: Column(
          children: <Widget>[
            TextField(
                onChanged: (text) {},
                decoration: InputDecoration(hintText: "Enter terminal id"),
                keyboardType: TextInputType.number,
                controller: terminalIdController),
            TextField(
                onChanged: (text) {},
                decoration: InputDecoration(hintText: "Enter latitude"),
                keyboardType: TextInputType.number,
                controller: latitudeController),
            TextField(
                onChanged: (text) {},
                decoration: InputDecoration(hintText: "Enter longitude"),
                keyboardType: TextInputType.number,
                controller: longitudeController),
            FlatButton(
              onPressed: () {
                setState(() {
                  submitData(terminalIdController.text, latitudeController.text,
                      longitudeController.text);
                });
              },
              child: Text("Submit marker"),
              color: Colors.red,
            ),
          ],
        ));
  }
}
