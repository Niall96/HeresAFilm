//
//  LogIn.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 06/02/2023.
//

import SwiftUI

struct LogIn: View {
    @State private var emailAddress = ""
    @State private var password = ""

    var body: some View {
        ZStack {
            VStack {
                Spacer()
                Image(systemName: "person")
                    .resizable()
                    .frame(width: 50, height: 50)
                    .foregroundColor(.blue)
                EnterTextfield(title: "Email Address", description: "Enter Email Address", text: $emailAddress)
                Passwordfield(title: "Password", description: "Enter Password", text: $password)
                Spacer()
                Button {
                    //Logs user in
                } label: {
                    Text("Log In")
                        .foregroundColor(.white)
                        .fontWeight(.bold)
                        .background(Capsule()
                            .fill(.blue)
                            .frame(width: 200, height: 40))
                }.padding(.top, 40)
                Button {
                    // takes user to forget password screen
                } label: {
                    Text("Forgot Password")
                        .font(.footnote)
                        .underline()
                }
                .padding(8)
                Spacer()
            }
            .padding()
        }.ignoresSafeArea()
    }
}

struct LogIn_Previews: PreviewProvider {
    static var previews: some View {
        LogIn()
    }
}
