import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Gps(),
    debugShowCheckedModeBanner: false,
  ));
}

class Location {
  late int id;
  late String latitude;
  late String longitude;
  late String terminal_id;

}

class Gps extends StatefulWidget {
  @override
  State<Gps> createState() => _GpsState();
}

class _GpsState extends State<Gps> {
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
                keyboardType: TextInputType.number),
            TextField(
                onChanged: (text) {},
                decoration: InputDecoration(hintText: "Enter latitude"),
                keyboardType: TextInputType.number),
            TextField(
                onChanged: (text) {},
                decoration: InputDecoration(hintText: "Enter longitude"),
                keyboardType: TextInputType.number),
            FlatButton(
              onPressed: () {},
              child: Text("Submit marker"),
              color: Colors.red,
            ),
          ],
        ));
  }
}
